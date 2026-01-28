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

            var result = Module._vsock_js_send(0, ptr, dataBytes.length);

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
            var available = Module._vsock_js_poll();

            if (available > 0) {
                // Allocate receive buffer
                var bufSize = Math.min(available, 65536);
                var ptr = Module._malloc(bufSize);

                var bytesRead = Module._vsock_js_recv(0, ptr, bufSize);

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
                Module._vsock_js_disconnect(0);
            } catch (e) {
                console.error('Virtual socket disconnect error:', e);
            }
            this.fd = -1;
        }

        this.connected = false;
        this.onclose && this.onclose({ code: 1000, reason: 'Client closed' });
    }
}

