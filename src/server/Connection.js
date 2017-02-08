export default class Connection {
  /**
   * Class used to define a connection
   *
   * @method   constructor
   *
   * @param    {String}       id          Connection id
   * @param    {String}       ip          Connection ip
   * @param    {Connection}   socket      Connection socket
   */
  constructor(connectionData) {
    this._id = connectionData.id
    this._ip = connectionData.ip
    this._socket = connectionData.socket
  }

  get id() { return this._id }
  set id(val) { this._id = val }

  get ip() { return this._ip }
  set ip(val) { this._ip = val }

  get socket() { return this._socket }
  set socket(val) { this._socket = val }
}
