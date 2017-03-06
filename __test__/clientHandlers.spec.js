import defaultHandlers from 'src/clientModules/defaultHandlers'

describe('clientHandlers', () => {
  it('should assign id to instance on register event', () => {
    const id = 'test'
    const instance = {}

    defaultHandlers.find(i => i.type === 'register').handler(id, instance)

    expect(instance.identifier).toBe(id)
  })
})
