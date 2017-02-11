import ConnectionsList from 'src/server/ConnectionsList'
import Connection from 'src/server/Connection'

const con = new Connection({
  id: 'testId',
  ip: 'testip',
  socket() {},
})

describe('Connections list', () => {
  it('should initialize with an empty connections list', () => {
    const conList = new ConnectionsList()
    expect(conList.list).toEqual([])
  })

  it('should add a new connection to the top of the list', () => {
    const conList = new ConnectionsList()

    expect(conList.list).toEqual([])
    conList.addConnection(con)
    expect(conList.list.length).toBe(1)
    expect(conList.list[0]).toBe(con)
  })

  it('should be a singleton and not reset the connections in  a new instance', () => {
    const conList = new ConnectionsList()
    expect(conList.list.length).toBe(1)
  })

  it('should be remove the connection by their id', () => {
    const conList = new ConnectionsList()
    conList.removeConnection(con)
    expect(conList.list.length).toBe(0)
  })
})
