import { Server } from 'ws'
import { encode } from 'base-64'

import Connection from 'src/server/Connection'
import ConnectionsList from 'src/server/ConnectionsList'
import defaultHandlers from 'src/server/handlers/serverHandlers'

import Event from 'src/shared/Event'
import parseMessage from 'src/shared/parseMessage'

const DEFAULT_OPTIONS = {
  host: '0.0.0.0',
  port: 9000,
  handlers: [],
}

let instance = null

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
    if (!instance) instance = this
    const options = Object.assign(DEFAULT_OPTIONS, customOptions)

    this.connections = new ConnectionsList()

    this.handlers = defaultHandlers.concat(options.handlers)

    this.ws = new Server({ port: options.port, host: options.host })
    this.ws.on('connection', (socket) => {
      console.log('connection connected')
      const socketConnection = socket.upgradeReq.connection

      const id = encode(socketConnection)

      this.connections.addConnection(new Connection({
        ip: socketConnection.remoteAddress,
        id,
        socket,
      }))

      const meta = {
        publisher: 'srv',
        recipient: id,
      }

      socket.send(new Event('register', id, meta).log().toString())

      socket.emit()
    })

    this.ws.on('message', msg => parseMessage(msg, this.handlers))

    return instance
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
  emitEvent(event, socketId) {
    this.connections.find(i => i.id === socketId).socket.send(event)
  }

  get ws() { return this._ws }
  set ws(val) { this._ws = val }

  get handlers() { return this._handlers }
  set handlers(val) { this._handlers = val }

  get connections() { return this._connections }
  set connections(val) { this._connections = val }
}
