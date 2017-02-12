export default class Connection {
  /**
   * Class used to define a connection
   *
   * @method   constructor
   *
   * @param    {Object}       connectionData  Custom options object containing the following props
   * @prop     {String}       id              Connection id
   * @prop     {String}       ip              Connection ip
   * @prop     {Connection}   socket          Connection socket
   */
  constructor(connectionData) {
    this.id = connectionData.id
    this.ip = connectionData.ip
    this.socket = connectionData.socket
  }

  get id() { return this._id }
  set id(val) { this._id = val }

  get ip() { return this._ip }
  set ip(val) { this._ip = val }

  get socket() { return this._socket }
  set socket(val) { this._socket = val }
}
