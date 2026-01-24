# Integration Proposal: Virtual Socket Support for Freeciv Web Client

## Executive Summary

The goal is to integrate the new Emscripten virtual socket API with the existing web client, enabling browser-based server execution (WASM) while maintaining backward compatibility with the traditional remote WebSocket server architecture.

---

## Current Architecture Analysis

**Key File: `public/javascript/src/clinet.js`**

The existing networking layer has these core components:

| Function | Purpose | Lines |
|----------|---------|-------|
| `network_init()` | Requests server port via AJAX, then calls `websocket_init()` | 59-91 |
| `websocket_init()` | Creates WebSocket connection, sets up event handlers | 96-153 |
| `check_websocket_ready()` | Sends login packet when connection is open | 159-195 |
| `send_request()` | Sends JSON packet via `ws.send()` | 209-259 |
| `network_stop()` | Closes WebSocket connection | 200-204 |

**WebSocket Usage Patterns Found:**

- Direct `ws.send()` in `send_request()`
- Event-driven receive via `ws.onmessage`
- Connection state checks via `ws.readyState === 1`
- Referenced in 10 files across the codebase

### Files with WebSocket References

- `clinet.js` - Core networking
- `hotseat.js` - Hotseat game mode
- `civclient.js` - Client state management
- `pbem.js` - Play-by-email mode
- `control.js` - Input controls

---

## Virtual Socket API (from Emscripten Plan)

The Emscripten WASM server exposes these JavaScript-callable functions:

```c
// Exported via EMSCRIPTEN_KEEPALIVE
int vsock_js_connect(void);                          // Returns socket FD
int vsock_js_send(int fd, const char* data, int len);
int vsock_js_recv(int fd, char* buf, int maxlen);
int vsock_js_poll(int fd);                           // Returns bytes available
void vsock_js_disconnect(int fd);
```

Reference: https://github.com/AlexusBlack/freecivx/blob/wasm-server/freeciv/freeciv/docs/virtual_socket_plan.md

---

## Proposed Integration Architecture

### 1. Transport Abstraction Layer

Create a new abstraction that supports both transport types.

**New file: `public/javascript/src/transport.js`**

```javascript
/**
 * Transport abstraction for Freeciv network communication.
 * Supports WebSocket (remote server) and VirtualSocket (local WASM server).
 */

var transport = null;
var transport_type = null;  // 'websocket' | 'vsocket'

// Detection: Check if WASM server module is loaded
function is_wasm_server_available() {
    return typeof Module !== 'undefined'
        && typeof Module._vsock_js_connect === 'function';
}

/**************************************************************************
 * Transport Factory - creates appropriate transport based on environment
 **************************************************************************/
function create_transport(options) {
    if (options.force_wasm || (options.auto_detect && is_wasm_server_available())) {
        transport_type = 'vsocket';
        return new VirtualSocketTransport();
    } else {
        transport_type = 'websocket';
        return new WebSocketTransport(options.url);
    }
}

/**************************************************************************
 * WebSocket Transport (existing behavior wrapped)
 **************************************************************************/
class WebSocketTransport {
    constructor(url) {
        this.ws = null;
        this.url = url;
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        this.onerror = null;
    }

    connect() {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = () => this.onopen && this.onopen();
        this.ws.onmessage = (event) => this.onmessage && this.onmessage(event.data);
        this.ws.onclose = (event) => this.onclose && this.onclose(event);
        this.ws.onerror = (event) => this.onerror && this.onerror(event);
    }

    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
            return true;
        }
        return false;
    }

    isConnected() {
        return this.ws && this.ws.readyState === WebSocket.OPEN;
    }

    close() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

/**************************************************************************
 * Virtual Socket Transport (new WASM-based communication)
 **************************************************************************/
class VirtualSocketTransport {
    constructor() {
        this.fd = -1;
        this.pollInterval = null;
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        this.onerror = null;
        this.connected = false;
        this.receiveBuffer = '';
    }

    connect() {
        try {
            // Call Emscripten-exported function
            this.fd = Module._vsock_js_connect();

            if (this.fd >= 0) {
                this.connected = true;

                // Start polling for incoming data
                this.pollInterval = setInterval(() => this._poll(), 16); // ~60Hz

                // Notify connection open
                setTimeout(() => this.onopen && this.onopen(), 0);
            } else {
                this.onerror && this.onerror({ message: 'Virtual socket connection failed' });
            }
        } catch (e) {
            this.onerror && this.onerror(e);
        }
    }

    send(data) {
        if (!this.connected || this.fd < 0) return false;

        try {
            // Convert string to bytes and send via virtual socket
            var dataBytes = new TextEncoder().encode(data);
            var ptr = Module._malloc(dataBytes.length);
            Module.HEAPU8.set(dataBytes, ptr);

            var result = Module._vsock_js_send(this.fd, ptr, dataBytes.length);

            Module._free(ptr);
            return result >= 0;
        } catch (e) {
            console.error('Virtual socket send error:', e);
            return false;
        }
    }

    _poll() {
        if (!this.connected || this.fd < 0) return;

        try {
            var available = Module._vsock_js_poll(this.fd);

            if (available > 0) {
                // Allocate receive buffer
                var bufSize = Math.min(available, 65536);
                var ptr = Module._malloc(bufSize);

                var bytesRead = Module._vsock_js_recv(this.fd, ptr, bufSize);

                if (bytesRead > 0) {
                    // Extract data and decode
                    var data = new Uint8Array(Module.HEAPU8.buffer, ptr, bytesRead);
                    var text = new TextDecoder().decode(data);

                    // Handle packet framing (JSON messages may be split)
                    this._processReceivedData(text);
                }

                Module._free(ptr);
            }
        } catch (e) {
            console.error('Virtual socket poll error:', e);
        }
    }

    _processReceivedData(text) {
        // Buffer incoming data and extract complete JSON packets
        this.receiveBuffer += text;

        // Try to parse complete JSON packets
        // Freeciv packets are JSON arrays or objects
        var startIdx = 0;
        while (startIdx < this.receiveBuffer.length) {
            try {
                // Find packet boundary (assumes newline-delimited or complete JSON)
                var packet = JSON.parse(this.receiveBuffer.substring(startIdx));
                this.onmessage && this.onmessage(JSON.stringify(packet));
                this.receiveBuffer = '';
                break;
            } catch (e) {
                // Incomplete JSON, wait for more data
                break;
            }
        }
    }

    isConnected() {
        return this.connected && this.fd >= 0;
    }

    close() {
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
            this.pollInterval = null;
        }

        if (this.fd >= 0) {
            try {
                Module._vsock_js_disconnect(this.fd);
            } catch (e) {
                console.error('Virtual socket disconnect error:', e);
            }
            this.fd = -1;
        }

        this.connected = false;
        this.onclose && this.onclose({ code: 1000, reason: 'Client closed' });
    }
}
```

---

### 2. Modifications to `clinet.js`

**Changes required:**

```javascript
// Replace global 'ws' with transport abstraction
var transport = null;  // Was: var ws = null;

// Modified network_init() - support both modes
function network_init() {
    // Check for local WASM server mode
    if (is_wasm_mode()) {
        transport = create_transport({ force_wasm: true });
        setup_transport_handlers();
        transport.connect();
        return;
    }

    // Existing WebSocket flow (unchanged)
    if (!("WebSocket" in window)) {
        swal("WebSockets not supported", "", "error");
        return;
    }
    // ... existing AJAX port request code ...
}

// New helper for WASM mode detection
function is_wasm_mode() {
    return $.getUrlVar('wasm') === 'true' || is_wasm_server_available();
}

// Modified websocket_init() → transport_init()
function transport_init() {
    $.blockUI({ message: "<h1>Connecting...</h1>" });

    if (transport_type === 'vsocket') {
        // Already connected in network_init for WASM mode
        return;
    }

    // WebSocket mode
    var proxyport = 1000 + parseFloat(civserverport);
    var ws_protocol = ('https:' == window.location.protocol) ? "wss:" : "ws:";
    var url = ws_protocol + freeciv_api_server_url + "/civsocket/" + proxyport;

    transport = create_transport({ url: url });
    setup_transport_handlers();
    transport.connect();
}

// Unified transport event handlers
function setup_transport_handlers() {
    transport.onopen = check_transport_ready;

    transport.onmessage = function(data) {
        if (typeof client_handle_packet !== 'undefined') {
            client_handle_packet(JSON.parse(data));
            if (DEBUG_LOG_PACKETS) console.log("<<< " + data);
        }
    };

    transport.onclose = function(event) {
        // ... existing onclose logic ...
    };

    transport.onerror = function(event) {
        // ... existing onerror logic ...
    };
}

// Modified check_websocket_ready() → check_transport_ready()
function check_transport_ready() {
    if (transport && transport.isConnected()) {
        // ... existing login logic ...
        send_request(JSON.stringify(login_message));
        // ... rest unchanged ...
    } else {
        setTimeout(check_transport_ready, 500);
    }
}

// Modified send_request()
function send_request(packet_payload) {
    if (transport != null) {
        // ... existing packet modification workaround ...
        transport.send(packet_payload);
    }
    // ... rest unchanged ...
}

// Modified network_stop()
function network_stop() {
    if (transport != null) transport.close();
    transport = null;
}
```

---

### 3. Additional Updates Required

**Files to update for `ws` → `transport` references:**

| File | Line | Change |
|------|------|--------|
| `hotseat.js` | 94 | `ws.readyState === 1` → `transport && transport.isConnected()` |
| `civclient.js` | 624 | `ws != null && ws.readyState === 1` → `transport && transport.isConnected()` |
| `civclient.js` | 653 | `ws.url` → `transport.url` (or add getter) |
| `pbem.js` | Various | Similar WebSocket state checks |
| `control.js` | Various | Any direct `ws` references |

---

### 4. Build Integration

**Add to webpack/bundling:**

```javascript
// In build configuration
entry: {
    // ... existing entries ...
    'transport': './src/transport.js'
}
```

**HTML changes for WASM mode:**

```html
<!-- Load WASM server module before client -->
<script src="freeciv-server.js"></script>
<script>
    // Initialize WASM module
    var Module = {
        onRuntimeInitialized: function() {
            console.log('WASM server ready');
            // Client can now connect
        }
    };
</script>
<script src="webclient.min.js"></script>
```

---

## Implementation Phases

### Phase 1: Transport Abstraction
- Create `transport.js` with both transport classes
- Maintain backward compatibility - WebSocket as default
- Unit tests for transport abstraction

### Phase 2: Update `clinet.js`
- Replace direct `ws` usage with transport abstraction
- Add WASM mode detection
- Update connection flow
- Maintain all existing functionality

### Phase 3: Update Dependent Files
- Update `hotseat.js`, `civclient.js`, etc.
- Replace all `ws.readyState` checks
- Add transport state helper functions if needed

### Phase 4: Integration Testing
- Test WebSocket mode (existing behavior)
- Test WASM mode with local server
- Test mode switching and fallback
- Test all game modes (singleplayer, multiplayer, hotseat, PBEM)

### Phase 5: Build Integration
- Update webpack/bundling configuration
- Create WASM-enabled HTML entry point
- Documentation and examples

---

## Key Technical Considerations

### 1. Packet Framing
Virtual sockets use raw byte streams vs. WebSocket's message framing. The `_processReceivedData()` method handles reassembly of JSON packets.

**Current WebSocket behavior:**
- Each `ws.send()` = one complete message
- Each `ws.onmessage` event = one complete message

**Virtual socket behavior:**
- Raw byte stream, no message boundaries
- Need to buffer and parse JSON boundaries
- Consider newline-delimited JSON or length-prefixed framing

### 2. Polling Frequency
Virtual socket requires active polling vs. WebSocket's event-driven model.

| Polling Rate | CPU Impact | Latency |
|--------------|------------|---------|
| 60 Hz (16ms) | Higher | Low (~8ms avg) |
| 30 Hz (33ms) | Medium | Medium (~16ms avg) |
| 20 Hz (50ms) | Lower | Higher (~25ms avg) |

Recommendation: Start with 60Hz, make configurable if needed.

### 3. Memory Management
Careful `Module._malloc/_free` usage for Emscripten heap operations.

```javascript
// Always pair malloc with free
var ptr = Module._malloc(size);
try {
    // ... use ptr ...
} finally {
    Module._free(ptr);
}
```

### 4. Backward Compatibility
All changes are additive; default behavior remains WebSocket-based.

- No URL parameters = WebSocket mode
- `?wasm=true` = Force WASM mode
- Auto-detect if Module available and no explicit parameter

### 5. Error Handling
Virtual socket errors need translation to WebSocket-like events for consistent UI handling.

```javascript
// Map virtual socket errors to WebSocket-compatible events
function translateError(vsockError) {
    return {
        code: vsockError.code || 1006,
        reason: vsockError.message || 'Connection error',
        wasClean: false
    };
}
```

---

## Testing Strategy

| Test Case | Expected Behavior |
|-----------|-------------------|
| `?wasm=false` or no param | Traditional WebSocket connection |
| `?wasm=true` with WASM loaded | Virtual socket connection |
| `?wasm=true` without WASM | Graceful fallback or error dialog |
| Network disconnect (WebSocket) | Existing error dialogs |
| Server stop (WASM) | Clean disconnect handling |
| High packet rate | No buffer overflow |
| Large packets | Correct reassembly |
| Rapid connect/disconnect | No memory leaks |
| Hotseat mode + WASM | All players work |
| Game save/load + WASM | State persists correctly |

---

## Migration Path

### For Existing Deployments
No changes required. WebSocket remains default.

### For WASM-Enabled Deployments
1. Build WASM server module
2. Update HTML to load WASM module
3. Add `?wasm=true` to URL or rely on auto-detection

### Rollback Strategy
Simply remove WASM module from HTML - client falls back to WebSocket automatically.

---

## Open Questions

1. **Packet framing protocol**: Should we use newline-delimited JSON, length-prefixed, or rely on JSON parsing?

2. **WASM module initialization**: Should client wait for `onRuntimeInitialized` or poll for availability?

3. **Dual-mode support**: Should a single client support connecting to remote WebSocket AND local WASM simultaneously (for hybrid scenarios)?

4. **Save game handling**: How are save games managed in WASM mode (local storage, download, etc.)?

---

## References

- Virtual Socket Plan: https://github.com/AlexusBlack/freecivx/blob/wasm-server/freeciv/freeciv/docs/virtual_socket_plan.md
- Current Web Client: `public/javascript/src/clinet.js`
- Emscripten Documentation: https://emscripten.org/docs/api_reference/
