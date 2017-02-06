import WebSocket from 'ws'

const DEFAULT_URL = 'ws://localhost:9000'

let instance = null

export default class RemClient {
  constructor(url = DEFAULT_URL, handlers = []) {
    if (!instance) instance = this

    this.ws = new WebSocket(url)

    this.ws.on('open', () => console.log('connection'))

    handlers.forEach(handler => this.ws.on(handler.name, handler.handler))

    return instance
  }
}
