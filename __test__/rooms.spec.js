import RoomManager from 'src/serverModules/roomManager'

describe('RoomManager.js', () => {
  let roomManager
  beforeEach(() => (roomManager = new RoomManager()))

  it('should keep an variable type object with the existent rooms', () => {
    expect(roomManager.rooms).toEqual({})
  })

  it('should add a new connection to a room', () => {
    roomManager.addClientToRoom('userId', 'testRoom')
    expect(roomManager.rooms.testRoom).toBeDefined()
    expect(roomManager.rooms.testRoom.find(i => i === 'userId')).toBeDefined()
  })

  it('should remove a connection from a room', () => {
    roomManager.addClientToRoom('userId', 'testRoom')
    roomManager.addClientToRoom('userId2', 'testRoom')
    expect(roomManager.rooms.testRoom).toBeDefined()
    expect(roomManager.rooms.testRoom.find(i => i === 'userId')).toBeDefined()
    roomManager.removeClientFromRoom('userId', 'testRoom')
    expect(roomManager.rooms.testRoom.find(i => i === 'userId')).not.toBeDefined()
  })

  it('should delete the room when it\'s empty ', () => {
    expect(roomManager.rooms.testRoom).not.toBeDefined()
    roomManager.addClientToRoom('userId', 'testRoom')
    expect(roomManager.rooms.testRoom).toBeDefined()
    roomManager.removeClientFromRoom('userId', 'testRoom')
    expect(roomManager.rooms.testRoom).not.toBeDefined()
  })

  it('should return an array with the id of all clients connected to a room ', () => {
    roomManager.addClientToRoom('11111', 'room')
    roomManager.addClientToRoom('22222', 'room')
    roomManager.addClientToRoom('33333', 'room')
    const users = roomManager.getClientsFromRoom('room')
    expect(users.length).toBe(3)
  })
})
