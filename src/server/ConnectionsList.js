let instance = null

export default class ConnectionsList {
  /**
   * Initialize the connections list
   *
   * @method   constructor
   */
  constructor() {
    if (!instance) instance = this

    this.list = []

    return instance
  }

  /**
   * Add a new connection to list list
   *
   * @method addConnection
   * @param  {Connection}  connection Connection instance with connection data.
   */
  addConnection(connection) {
    this.list.unshift(connection)
  }

  /**
   * Remove connection from list
   *
   * @method removeConnection
   * @param  {Connection}  connection Connection instance to be deleted
   */
  removeConnection(connection) {
    this.list = this.list.filter(item => item.id !== connection.id)
  }

  get list() { return this._list }
  set list(val) { this._list = val }
}
