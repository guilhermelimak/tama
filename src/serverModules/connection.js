export default class Connection {
  /**
   * Class used to define a connection
   *
   * @method   constructor
   *
   * @param    {Object}       conData         Object containing the connection data
   * @prop     {String}       conData.id      Connection id
   * @prop     {String}       conData.ip      Connection ip
   * @prop     {Socket}       conData.socket  Connection socket
   */
  constructor(conData) {
    if ('ip' in conData && 'id' in conData && 'socket' in conData) {
      this.id = conData.id
      this.ip = conData.ip
      this.socket = conData.socket
    }
  }

  get id() { return this._id }
  set id(val) { this._id = val }

  get ip() { return this._ip }
  set ip(val) { this._ip = val }

  get socket() { return this._socket }
  set socket(val) { this._socket = val }
}
