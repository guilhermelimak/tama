export default class RoomManager {
  /**
   * Class used to manage the server rooms
   * @type {Object}
   */
  constructor() { this.rooms = {} }

  /**
   * Get an array containing all the clients in a room
   * @method getClientsFromroom
   * @param  {[type]}           roomName [description]
   * @returns {[type]}           [description]
   */
  getClientsFromRoom(roomName) {
    const room = this.rooms[roomName]

    if (!room) return new Error('Room not found')

    return room
  }

  /**
   * Add client to a new room
   * @method addClientToRoom
   * @param  {String}       clientId   Client id
   * @param  {String}       roomName Room to add client to
   */
  addClientToRoom(clientId, roomName) {
    const room = this.rooms[roomName]

    if (!room) this._createRoom(roomName)

    this.rooms[roomName].push(clientId)

    return this
  }

  /**
   * Move client to a new room
   * @method removeClientFromRoom
   * @param  {String}       clientId Client id
   * @param  {String}       roomName Room to remove client from
   */
  removeClientFromRoom(clientId, roomName) {
    const room = this.rooms[roomName]

    if (!room) return new Error('Room not found')

    this.rooms[roomName] = room.filter(id => id !== clientId)

    if (this.rooms[roomName].length < 1) this._deleteRoom(roomName)

    return this
  }

  _createRoom(name) { this.rooms[name] = [] }
  _deleteRoom(name) { delete this.rooms[name] }
}
