import { Server } from 'ws'

import ClientsList from 'src/server/ClientsList'
import serverHandlers from 'src/server/handlers/serverHandlers'

let instance = null

export default class RemServer {
  constructor(host, port) {
    if (!instance) instance = this

    this._clients = new ClientsList()

    this._ws = new Server({
      port: port || 9000,
      host: host || '0.0.0.0',
    })

    serverHandlers.forEach(event => this._ws.on(event.name, event.handler))

    return instance
  }

  get clients() {
    return this._clients
  }

  get server() {
    return this._ws
  }
}
