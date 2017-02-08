import WebSocket from 'ws'
import Event from 'src/shared/Event'

const DEFAULT_URL = 'ws://localhost:9000'

let instance = null

export default class RemClient {
  constructor(customOptions) {
    if (!instance) instance = this
    const defaultOptions = { url: DEFAULT_URL, handlers: [] }
    const options = Object.assign(defaultOptions, customOptions)

    this.ws = new WebSocket(options.url)
    console.log(this.ws)
    this.ws.on('open', () => console.log('Connected to server'))
    this.ws.on('register', (res) => {
      console.log(res)(this.identifier = res)
    })

    return instance
  }

  emitEvent(name, payload) {
    const meta = { publisher: this.identifier, recipient: 'srv' }
    const event = new Event(name, payload, meta).log()
    this.ws.send(event.toString())
  }

  get identifier() { return this._identifier }
  set identifier(val) { this._identifier = val }
}
