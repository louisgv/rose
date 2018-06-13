import {
    decompressPng
} from 'rose-util'

import {BSON} from 'bson'

import EventEmitter from 'eventemitter3'

export default class SocketAdapter {
    client : any
    bson: BSON

    constructor(client: EventEmitter) {
        this.client = client
        this.bson = new BSON()
    }

    onOpen(event) {
        this.client.isConnected = true;
        this.client.emit('connection', event);
    }

    /**
     * Emits a 'close' event on WebSocket disconnection.
     *
     * @param event - the argument to emit with the event.
     * @memberof SocketAdapter
     */
    onClose(event) {
        this.client.isConnected = false;
        this.client.emit('close', event);
    }

    /**
     * Emits an 'error' event whenever there was an error.
     *
     * @param event - the argument to emit with the event.
     * @memberof SocketAdapter
     */
    onError(event) {
        this.client.emit('error', event);
    }

    /**
     * Parses message responses from rosbridge and sends to the appropriate
     * topic, service, or param.
     *
     * @param message - the raw JSON message from rosbridge.
     * @memberof SocketAdapter
     */
    async onMessage(body: any) {

        const message = (body.data instanceof Blob) ?
            await this.decodeBSON(body.data) :
            JSON.parse(typeof body === 'string' ? body : body.data)

        const imageData = await this.handlePng(message)

        if (!imageData) {
            this.handleMessage(message)
        }
    }

    handlePng = ({
        op,
        data
    }: any) => (op === 'png') ? decompressPng(data) : null

    decodeBSON = (data: Blob) => new Promise ((resolve, reject)=>{
        const reader = new FileReader()
        reader.onload = () => {
            try {
                const resultBuffer = new Buffer(reader.result)

                const msg = this.bson.deserialize(resultBuffer)
                
                resolve(msg)
            } catch (error) {
                reject(error)
            }
        }

        reader.readAsArrayBuffer(data)
    })

    private handleMessage(body: any) {
        const {
            op,
            id,
            topic,
            service,
            msg
        } = body

        const {
            client
        } = this
        switch (op) {
            case 'publish':
                {
                    client.emit(topic, msg)
                    break;
                }
            case 'service_response':
                {
                    client.emit(id, body)

                    break;
                }
            case 'call_service':
                {
                    client.emit(service, body);

                    break;
                }
            case 'status':
                {
                    if (id) {
                        client.emit('status:' + id, body);
                    } else {
                        client.emit('status', body);
                    }
                    break;
                }
            default:
                break;
        }
    }

}