let instance = null

export default class ClientsList {
  constructor() {
    if (!instance) instance = this

    this._clients = []

    return instance
  }

  get clients() { return this._clients }

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
    console.log(clientId, newProps)
    return this.clientId
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
