import WebSocket from 'ws'
import 'colors'

import Event from 'src/shared/Event'
import parseMessage from 'src/shared/parseMessage'
import clientHandlers from 'src/client/clientHandlers'

const RETRY_INTERVAl = 1000
const DEFAULT_URL = 'ws://localhost:9000'

let instance = null

export default class RemClient {
  /**
   * Create a new client instance
   *
   * @method   constructor
   *
   * @param    {String}      url             Server url to connect
   * @param    {Array}       handlers        Handlers array
   *
   * @return   {Client}      Client instance
   */
  constructor(url = DEFAULT_URL, handlers = []) {
    if (!instance) instance = this
    const _handlers = [...handlers, ...clientHandlers]

    this.ws = new WebSocket(url)
    this.ws.on('open', () => console.log('Connected to server'))
    this.ws.on('message', message => (parseMessage.bind(this)(message, _handlers)))

    return instance
  }

  /**
   * Emit event to the server. This method will retry the emitEvent forever in 1s intervals until
   * it succeeds
   *
   * @method   emitEvent
   *
   * @param    {String}                 type      Event type
   * @param    {Object|Array|String}    payload   Event payload
   */
  /* eslint-disable class-methods-use-this */
  emitEvent(type, payload) {
    // VAI SI FUDE TODO MUNDO DESGRAÇA
    let eventEmitted = false

    setInterval(() => {
      if (!this || !this.identifier || eventEmitted) return

      const event = new Event({
        type,
        payload,
        meta: {
          publisher: this.identifier,
          recipient: 'srv',
        },
      })

      this.ws.send(event.toString())

      eventEmitted = true
    }, RETRY_INTERVAl)
  }

  get identifier() { return this._identifier }
  set identifier(val) { this._identifier = val }
}
