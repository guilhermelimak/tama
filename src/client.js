import 'colors'
import WebSocket from 'ws'

import { Event, parseMessage } from 'src/shared/index.js'
import { defaultHandlers, defaultOptions } from 'src/clientModules/index.js'

const RETRY_INTERVAl = 1000

export default class RemClient {
  /**
   * Create a new client instance
   *
   * @method   constructor
   *
   * @param    {Object}            customOptions   Options object with the following props
   * @param    {String}            url             Server url to connect
   * @param    {Array}             handlers        Handlers array
   * @param    {WebSocketClient}   wsclient        The websocket client constructor
   *
   * @return   {Client}      Client instance
   */
  constructor(customOptions) {
    this.options = Object.assign(defaultOptions, customOptions)
    const _handlers = [...this.options.handlers, ...defaultHandlers]

    this.ws = WebSocket.connect(this.options.url)
    this.ws.on('open', () => console.log('Connected to server'))
    this.ws.on('message', message => (parseMessage.bind(this)(message, _handlers)))
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

    const tryEmit = () => {
      // Check the identifier to know if the client is registered
      if (!this || !this.identifier || eventEmitted) return

      const event = new Event({
        type,
        payload,
        meta: {
          publisher: this.identifier,
          recipient: 'srv',
        },
      })

      this._ws.send(event.toString())
      eventEmitted = true
    }

    setInterval(tryEmit, RETRY_INTERVAL)
  }

  /**
   * Add event handler
   *
   * @method on
   *
   * @param  {String} type    [description]
   * @param  {Function} handler [description]
   */
  on(type, handler) {
    this.handlerManager.add({ type, handler })
  }

  get identifier() { return this._identifier }
  set identifier(val) { this._identifier = val }
}
