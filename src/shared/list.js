/**
 * List used to hold objects
 */
export default class List {
  constructor(idKey = 'id') {
    this.idKey = idKey
    this.items = []
  }

  /**
   * Add a new item to list.
   *
   * @method add
   * @param  {Object}  item   Item instance with item data
   */
  add(item) { if (item) this.items.unshift(item) }

  /**
   * Remove item from list using id.
   *
   * @method remove
   * @param  {Object}  itemId   Id of item instance to be deleted
   */
  remove(itemId) { if (itemId) this.items = this.items.filter(i => i[this.idKey] !== itemId) }

  get items() { return this._items }
  set items(val) { this._items = val }
}
