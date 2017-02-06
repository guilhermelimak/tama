import { Server } from 'ws'

import ClientsList from 'src/server/ClientsList'
import defaultHandlers from 'src/server/handlers/serverHandlers'

let instance = null

const DEFAULT_URL = '0.0.0.0'
const DEFAULT_PORT = 9000

export default class RemServer {
  /**
   * Create a new server instance
   *
   * @method   constructor
   *
   * @param    {String}      host       Host address to listen in. (Default: '0.0.0.0')
   * @param    {Number}      port       Port to listen in. (Default: 9000)
   * @param    {Array}       handlers   Array of event handler objects to be added to client
   *                                    instance
   */
  constructor(host = DEFAULT_URL, port = DEFAULT_PORT, handlers = []) {
    if (!instance) instance = this

    this._ws = new Server({ port, host })
    this._clients = new ClientsList()

    defaultHandlers.concat(handlers).forEach(event => this._ws.on(event.name, event.handler))

    return instance
  }

  get clients() { return this._clients }
  get ws() { return this._ws }

  /**
   * Send message to all connected clients
   *
   * @method   broadcastToAll
   * @param    {Event}  event  Event instance to be sent
   */
  broadcastToAll(event) { this.clients.forEach(client => client.send(event)) }

  /**
   * Emit message to one client
   *
   * @method sendMessage
   * @param  {Event}  event     Event instance to be sent
   * @param  {String} clientId  Client to send the event to
   */
  sendEvent(event, clientId) {
    const client = this.clients.find(item => item.id === clientId)
    client.send(event)
  }
}
