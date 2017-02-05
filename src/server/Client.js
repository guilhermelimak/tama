export default class Client {
  /**
   * Class used to define a client
   *
   * @method   constructor
   *
   * @param    {String}       id           Client id
   * @param    {Connection}   connection   Client connection
   */
  constructor(id, connection) {
    this._id = id
    this._connection = connection
    this._ip = null
    this._namespace = null
  }

  get namespace() { return this._namespace }
  set namespace(val) { this._namespace = val }

  get id() { return this._id }
  set id(val) { this._id = val }

  get ip() { return this._ip }
  set ip(val) { this._ip = val }

  get connection() { return this._connection }
  set connection(val) { this._connection = val }
}
