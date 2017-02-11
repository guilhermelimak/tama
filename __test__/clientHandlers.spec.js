import clientHandlers from 'src/client/clientHandlers'

describe('clientHandlers', () => {
  it('should assign id to instance on register event', () => {
    const id = 'test'
    const instance = {}

    clientHandlers.find(i => i.type === 'register').handler(id, instance)

    expect(instance.identifier).toBe(id)
  })
})
