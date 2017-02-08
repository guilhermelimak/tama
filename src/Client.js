import WebSocket from 'ws'
import 'colors'

import Event from 'src/shared/Event'
import parseMessage from 'src/shared/parseMessage'
import clientHandlers from 'src/client/clientHandlers'

const DEFAULT_URL = 'ws://localhost:9000'

let instance = null

export default class RemClient {
  constructor(customOptions, handlers) {
    if (!instance) instance = this

    const defaultOptions = { url: DEFAULT_URL }
    const options = Object.assign(defaultOptions, customOptions)
    const _handlers = [...handlers, ...clientHandlers]

    this.ws = new WebSocket(options.url)
    this.ws.on('open', () => console.log('Connected to server'))
    this.ws.on('message', message => (parseMessage.bind(this)(message, _handlers)))

    return instance
  }

  emitEvent(type, payload) {
    const meta = { publisher: this.identifier, recipient: 'srv' }
    const event = new Event({ type, payload, meta }).log()
    this.ws.send(event.toString())
  }

  get identifier() { return this._identifier }
  set identifier(val) { this._identifier = val }
}
