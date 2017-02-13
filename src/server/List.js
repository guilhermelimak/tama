export default class List {
  /**
   * Initialize the list.
   *
   * @method   constructor
   */
  constructor() { this.list = [] }

  /**
   * Add a new item to list.
   *
   * @method add
   * @param  {Object}  item   Item instance with item data
   */
  add(item) { if (item) this.list.unshift(item) }

  /**
   * Remove item from list.
   *
   * @method remove
   * @param  {Object}  item   Item instance to be deleted
   */
  remove(item) { if (item.id) this.list = this.list.filter(i => i.id !== item.id) }

  get list() { return this._list }
  set list(val) { this._list = val }
}
