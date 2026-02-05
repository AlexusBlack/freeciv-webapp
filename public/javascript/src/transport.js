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
 *
 * Freeciv JSON packet format:
 *   [2 bytes: length (uint16 big-endian)] [JSON string] [1 byte: null terminator]
 *
 * The length field includes itself, the JSON data, and the null terminator.
 * So for JSON of length L, total packet = L + 3, and length field = L + 3.
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
        this.receiveBuffer = new Uint8Array(0);  // Binary buffer for framed packets
        this.receiveBufferAcc = new Uint8Array(0);  // Binary buffer for framed packets
    }

    connect() {
        try {
            // Call Emscripten-exported function (client_id = 0 for single connection)
            this.fd = Module._vsock_js_connect(0);

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
            // Convert JSON string to UTF-8 bytes
            var jsonBytes = new TextEncoder().encode(data);

            // Packet format: [2-byte length][JSON][null terminator]
            // Length field = 2 (length) + jsonBytes.length + 1 (null) = jsonBytes.length + 3
            var packetLen = jsonBytes.length + 3;
            var packet = new Uint8Array(packetLen);

            // Write 2-byte length prefix (big-endian)
            packet[0] = (packetLen >> 8) & 0xFF;  // high byte
            packet[1] = packetLen & 0xFF;         // low byte

            // Copy JSON data starting at offset 2
            packet.set(jsonBytes, 2);

            // Null terminator at the end (Uint8Array is zero-initialized, but be explicit)
            packet[packetLen - 1] = 0;

            // Allocate WASM memory and copy packet
            var ptr = Module._malloc(packet.length);
            Module.HEAPU8.set(packet, ptr);

            var result = Module._vsock_js_send(0, ptr, packet.length);

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
            // Check if server has data to send to us
            var hasData = Module._vsock_js_has_data(0);

            if (hasData > 0) {
                // Allocate receive buffer
                var bufSize = 65536;
                var ptr = Module._malloc(bufSize);

                var bytesRead = Module._vsock_js_recv(0, ptr, bufSize);

                if (bytesRead > 0) {
                    // Copy data from WASM heap
                    var newData = new Uint8Array(Module.HEAPU8.buffer, ptr, bytesRead).slice();

                    // Append to receive buffer
                    var combined = new Uint8Array(this.receiveBuffer.length + newData.length);
                    combined.set(this.receiveBuffer);
                    combined.set(newData, this.receiveBuffer.length);
                    this.receiveBuffer = combined;

                    // Process complete packets
                    this._processReceivedData();
                }

                Module._free(ptr);
            }
        } catch (e) {
            console.error('Virtual socket poll error:', e);
        }
    }

    _processReceivedData() {
        // Process length-prefixed packets from binary buffer
        while (this.receiveBuffer.length >= 2) {
            // if(this.receiveBuffer.at(-1) != 0) {
            //     // add receiveBuffer to receiveBufferAcc
            //     var combined = new Uint8Array(this.receiveBufferAcc.length + this.receiveBuffer.length);
            //     combined.set(this.receiveBufferAcc);
            //     combined.set(this.receiveBuffer, this.receiveBufferAcc.length);
            //     this.receiveBufferAcc = combined;
            //     this.receiveBuffer = new Uint8Array(0);
            //     continue;
            // }
            // // Append receiveBuffer to receiveBufferAcc
            // var combined = new Uint8Array(this.receiveBufferAcc.length + this.receiveBuffer.length);
            // combined.set(this.receiveBufferAcc);
            // combined.set(this.receiveBuffer, this.receiveBufferAcc.length);
            // this.receiveBufferAcc = combined;

            // Read 2-byte length (big-endian)
            var packetLen = (this.receiveBuffer[0] << 8) | this.receiveBuffer[1];

            // Sanity check
            if (packetLen < 3 || packetLen > 65536) {
                console.error('Invalid packet length:', packetLen);
                this.receiveBuffer = new Uint8Array(0);
                break;
            }

            // Check if we have the complete packet
            if (this.receiveBuffer.length < packetLen) {
                // Wait for more data
                break;
            }
            // Extract JSON data (skip 2-byte header, exclude null terminator)
            var jsonData = this.receiveBuffer.slice(2, packetLen - 1);
            var jsonStr = new TextDecoder().decode(jsonData);

            // Remove processed packet from buffer
            this.receiveBuffer = this.receiveBuffer.slice(packetLen);
            // this.receiveBuffer = this.receiveBuffer.slice(this.receiveBuffer.length);

            // let receivedString = new TextDecoder().decode(this.receiveBufferAcc);
            // let packets = receivedString.split('\x00');
            // // filter out empty packets
            // packets = packets.filter(Boolean);
            const packets = [jsonStr];

            packets.forEach(p => {
              // Parse and deliver the packet
              try {
                  var packet = JSON.parse(p);
                  // this.onmessage && this.onmessage(JSON.stringify(packet));
                  this.onmessage && this.onmessage(JSON.stringify([packet]));
              } catch (e) {
                  console.error('Failed to parse JSON packet:', p, e);
              }
            });
            // this.receiveBuffer = new Uint8Array(0);
            this.receiveBufferAcc = new Uint8Array(0);


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
        this.receiveBuffer = new Uint8Array(0);
        this.onclose && this.onclose({ code: 1000, reason: 'Client closed' });
    }
}

