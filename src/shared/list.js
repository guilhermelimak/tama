/**
 * List used to hold objects
 */
export default class List {
  constructor(items = [], idKey = 'id') {
    this._idKey = idKey
    this.items = items
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
  remove(itemId) { if (itemId) this.items = this.items.filter(i => i[this._idKey] !== itemId) }

  /**
   * Get item by itemId
   * @method item
   * @param  {String|Number} itemId [description]
   * @returns {Object} [description]
   */
  item(itemId) { return this._items.find(i => i[this._idKey] === itemId) || undefined }

  get items() { return this._items }
  set items(val) { this._items = val }
}
