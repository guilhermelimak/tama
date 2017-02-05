import rem from '../src'

describe('index file exports', () => {
  it('should containg the Server and Client properties', () => {
    expect(rem.Client).toBeDefined()
    expect(rem.Server).toBeDefined()
  })
})
