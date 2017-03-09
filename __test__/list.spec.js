import List from 'src/shared/list'

const item = {
  name: 'test',
  id: 0,
}

describe('list', () => {
  it('should initialize an empty list', () => {
    const { items } = new List()
    expect(items).toEqual([])
  })

  it('should accept an Array as first parameter in constructor with initial values to the list', () => {
    const { items } = new List([item, item, item])
    expect(items).toEqual([item, item, item])
  })

  it('should return an item by the id', () => {
    const list = new List([item, { name: 'Random', id: 1 }])

    const { id, name } = list.item(0)

    expect(id).toBe(0)
    expect(name).toBe('test')
  })

  it('should accept an String as second parameter in constructor as the name of the key used to compare items', () => {
    const list = new List([item, { name: 'Random', id: 1 }], 'name')
    const { id, name } = list.item('test')

    expect(id).toBe(0)
    expect(name).toBe('test')
  })

  it('should add a new item to the top of the list', () => {
    const list = new List()

    list.add({ name: 'name' })

    expect(list.items[0]).toEqual({ name: 'name' })
  })

  it('should return undefind when the itemId is not found', () => {
    const list = new List([{ name: 'name' }])

    expect(list.item(0)).not.toBeDefined()
  })

  it('should be able to remove an item by the id', () => {
    const list = new List([{ id: 1 }, { id: 0 }, { id: 3 }])

    list.remove(1)

    expect(list.items).toEqual([{ id: 0 }, { id: 3 }])
  })
})
