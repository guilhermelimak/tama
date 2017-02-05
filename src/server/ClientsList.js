let instance = null

export default class Clients {
  constructor() {
    if (!instance) instance = this

    this._clients = []

    return instance
  }

  get clients() { return this._clients }

  /**
   * Emit message to one or multiple sockets
   *
   * @method sendMessage
   * @param  {Event}  event Event instance containing the event data.
   */
  sendMessage(event) {
    const client = this._clients.find(item => item.id === event.meta.publisher)
    client.send(event)
  }

  /**
   * Add a new client to clients list
   *
   * @method addClient
   * @param  {Client}  client Client instance with client data.
   */
  addClient(client) {
    this._clients.unshift(client)
  }

  /**
   * Update client props
   *
   * @method   updateClient
   *
   * @param    {String}       clientId   Client id to be updated
   * @param    {Object}       newProps   New props to be assigned to client
   */
  updateClient(clientId, newProps) {
    // const client = this._clients.find(item => console.log(item, clientId))
    // const client = this._clients.find(item => item.id === clientId)
    // console.log(client)
    // client.ip = newProps.ip
    // client.namespace = newProps.namespace
  }

  /**
   * Remove client from list
   *
   * @method removeClient
   * @param  {Client}  client Client instance to be deleted
   */
  removeClient(client) {
    this._clients = this._clients.filter(item => item.id !== client.id)
  }
}
