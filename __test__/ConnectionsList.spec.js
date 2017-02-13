import List from 'src/server/List'
import Connection from 'src/server/Connection'

const con = new Connection({
  id: 'testId',
  ip: 'testip',
  socket() {},
})

describe('Connections list', () => {
  it('should initialize with an empty connections list', () => {
    const conList = new List()
    expect(conList.list).toEqual([])
  })

  it('should add a new connection to the top of the list', () => {
    const conList = new List()

    expect(conList.list).toEqual([])
    conList.add(con)
    expect(conList.list.length).toBe(1)
    expect(conList.list[0]).toBe(con)
  })

  it('should be remove the connection by their id', () => {
    const conList = new List()
    conList.remove(con)
    expect(conList.list.length).toBe(0)
  })
})
