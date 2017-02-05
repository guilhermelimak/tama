import WebSocket from 'ws'

const URL = 'ws://localhost:9000'

let instance = null

export default class Client {
  constructor(url, handlers) {
    if (!instance) instance = this

    this.ws = new WebSocket(URL)

    this.ws.on('open', () => console.log('connection'))

    handlers.forEach(handler => this.ws.on(handler.name, handler.handler))

    return instance
  }
}
