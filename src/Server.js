import { Server } from 'ws'
import 'colors'

import {
  ConnectionsList,
  registerClient,
  defaultOptions,
  defaultHandlers,
} from 'src/server/index.js'

import { Event, parseMessage } from 'src/shared'

export default class RemServer {
  /**
   * Create a new server instance
   *
   * @method   constructor
   * @param    {Object}      opt                  Options object
   * @param    {String}      opt.host             Host address to listen in. (Default: '0.0.0.0')
   * @param    {Number}      opt.port             Port to listen in. (Default: 9000)
   * @param    {Array}       opt.handlers         Array of event handler objects to be added to
   *                                              instance
   */
  constructor(opt) {
    this.options = Object.assign(defaultOptions, opt)
    this.connections = new ConnectionsList()

    this.handlers = defaultHandlers.concat(this.options.handlers)

    this.ws = new Server({ port: this.options.port, host: this.options.host })

    this.ws.on('connection', (socket) => {
      const con = registerClient(socket)
      this.connections.addConnection(con)
    })

    this.ws.on('message', msg => parseMessage(msg, this.handlers))
  }

  /**
   * Send event to all connected connections
   *
   * @method   broadcastToAll
   * @param    {Event}  event  Event instance to be sent
   */
  broadcastEvent(event) {
    if (!(event instanceof Event)) {
      return console.error('Argument event is not an instance of the Event class')
    }

    this.connections.list.forEach(connection => connection.socket.send(event))

    return this
  }

  /**
   * Emit event to one connection
   *
   * @method emitEvent
   * @param  {Event}  event     Event instance to be sent
   * @param  {String} socketId  Connection to send the event to
   */
  emitEvent(event, socketId) {
    if (!(event instanceof Event)) {
      return console.error('Argument event is not an instance of the Event class')
    }

    this.connections.list.find(i => i.id === socketId).socket.send(event)

    return this
  }

  /**
   * Close all connections and shut down the server
   *
   * @method   close
   */
  close() {
    this.ws.close()

    return this
  }

  get ws() { return this._ws }
  set ws(val) { this._ws = val }

  get handlers() { return this._handlers }
  set handlers(val) { this._handlers = val }

  get connections() { return this._connections }
  set connections(val) { this._connections = val }

  get options() { return this._options }
  set options(val) { this._options = val }
}
