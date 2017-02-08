let instance = null

export default class ConnectionsList {
  /**
   * Initialize the connections list
   *
   * @method   constructor
   */
  constructor() {
    if (!instance) instance = this

    this.connections = []

    return instance
  }

  /**
   * Add a new connection to connections list
   *
   * @method addConnection
   * @param  {Connection}  connection Connection instance with connection data.
   */
  addConnection(connection) {
    this.connections.unshift(connection)
  }

  /**
   * Remove connection from list
   *
   * @method removeConnection
   * @param  {Connection}  connection Connection instance to be deleted
   */
  removeConnection(connection) {
    this.connections = this.connections.filter(item => item.id !== connection.id)
  }

  get connections() { return this._connections }
  set connections(val) { this._connections = val }
}
