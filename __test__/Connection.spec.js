import Connection from 'src/serverModules/Connection'

describe('Connection', () => {
  it('should assign the props passed as arguments', () => {
    const opt = {
      ip: 'testIp',
      id: 'testId',
      socket: 'testSocket',
    }

    const connection = new Connection(opt)
    expect(connection.ip).toBe(opt.ip)
    expect(connection.id).toBe(opt.id)
    expect(connection.sockeet).toBe(opt.sockeet)
  })
})
