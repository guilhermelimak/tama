import { Server } from 'ws'
import 'colors'

import ConnectionsList from 'src/server/ConnectionsList'

import defaultOptions from 'src/server/defaultOptions'
import defaultHandlers from 'src/server/defaultHandlers'
import onClientConnect from 'src/server/onClientConnect'
import parseMessage from 'src/shared/parseMessage'

export default class RemServer {
  /**
   * Create a new server instance
   *
   * @method   constructor
   * @param    {String}      host       Host address to listen in. (Default: '0.0.0.0')
   * @param    {Number}      port       Port to listen in. (Default: 9000)
   * @param    {Array}       handlers   Array of event handler objects to be added to instance
   */
  constructor(customOptions) {
    const options = Object.assign(defaultOptions, customOptions)

    this.connections = new ConnectionsList()
    this.handlers = defaultHandlers.concat(options.handlers)

    this.ws = new Server({ port: options.port, host: options.host })
    this.ws.on('connection', socket => onClientConnect(socket, this.connections))
    this.ws.on('message', msg => parseMessage(msg, this.handlers))
  }

  /**
   * Send event to all connected connections
   *
   * @method   broadcastToAll
   * @param    {Event}  event  Event instance to be sent
   */
  broadcastEvent(event) { this.connections.forEach(connection => connection.socket.send(event)) }

  /**
   * Emit event to one connection
   *
   * @method emitEvent
   * @param  {Event}  event     Event instance to be sent
   * @param  {String} connectionId  Connection to send the event to
   */
  emitEvent(event, socketId) { this.connections.find(i => i.id === socketId).socket.send(event) }

  /**
   * Close all connections and shut down the server
   *
   * @method   close
   */
  close() { this.ws.close() }

  get ws() { return this._ws }
  set ws(val) { this._ws = val }

  get handlers() { return this._handlers }
  set handlers(val) { this._handlers = val }

  get connections() { return this._connections }
  set connections(val) { this._connections = val }
}
