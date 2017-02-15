import List from 'src/serverModules/list'
import Connection from 'src/serverModules/connection'

const con = new Connection({
  id: 'testId',
  ip: 'testip',
  socket() {},
})

describe('Connections list', () => {
  it('should initialize with an empty connections list', () => {
    const conList = new List()
    expect(conList.items).toEqual([])
  })

  it('should add a new connection to the top of the list', () => {
    const conList = new List()

    expect(conList.items).toEqual([])
    conList.add(con)
    expect(conList.items.length).toBe(1)
    expect(conList.items[0]).toBe(con)
  })

  it('should be remove the connection by their id', () => {
    const conList = new List()
    conList.remove(con)
    expect(conList.items.length).toBe(0)
  })
})
