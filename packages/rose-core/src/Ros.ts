import EventEmitter from 'eventemitter3'
import WebSocket from 'ws'

import SocketAdapter from './SocketAdapter'

interface RosOptions {
    groovyCompatibility: boolean | undefined
    transportCallback ? : Function
    transportInstance ? : any
    url ? : string
}

export default class Ros extends EventEmitter {

    socket: any
    idCounter = 0
    isConnected = false

    options: RosOptions

    constructor({
        groovyCompatibility = true,
        transportInstance = null,
        transportCallback = () => {},
        url = null
    }) {
        super()

        this.options = {
            groovyCompatibility,
            transportInstance,
            transportCallback
        }

        if (url != null) {
            this.connect(url!)
        }

    }

    connect = (url: string) => {
        const {
            transportInstance,
            transportCallback
        } = this.options

        const adapter = new SocketAdapter(this)

        this.socket = Object.assign(transportInstance || new WebSocket(url), adapter)

        if (transportCallback){
            transportCallback(this.socket)
        }
    }

    close = () => {
        if (this.socket) {
            this.socket.close();
        }
    }

}