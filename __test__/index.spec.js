import { Client, Server } from 'src'

describe('index file exports', () => {
  it('should containg the Server and Client properties', () => {
    expect(Client).toBeDefined()
    expect(Server).toBeDefined()
  })

  it('should be able to use it with require()', () => {
    const rem = require('../src')

    expect(rem.Client).toBeDefined()
    expect(rem.Server).toBeDefined()
  })
})
