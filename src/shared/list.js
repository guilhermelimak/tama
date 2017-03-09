export default class List {
  /**
   * Create a new list
   *
   * @param  {Array}     [items=[]]   [description]
   * @param  {string}    [idKey='id'] [description]
   */
  constructor(items = [], idKey = 'id') {
    this._idKey = idKey
    this.items = items
  }

  /**
   * Add a new item to list.
   *
   * @param  {Object}  item   Item to be added
   */
  add(item) {
    if (item !== undefined) this.items.unshift(item)
  }

  /**
   * Remove item from list using id.
   *
   * @param  {Object}  itemId   Id of item to be deleted
   */
  remove(itemId) {
    if (itemId !== undefined) this.items = this.items.filter(i => i[this._idKey] !== itemId) || []
  }

  /**
   * Get item by id
   *
   * @param  {String|Number} itemId  Id of item to be returned
   * @returns {Object}               Item or undefined if id not found
   */
  item(itemId) {
    return this.items.find(i => i[this._idKey] === itemId) || undefined
  }
}
