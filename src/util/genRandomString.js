/**
 * Return a 10 char "random" string, used only as identifier of some objects
 *
 * @method genRandomString
 * @return   {[type]}   [description]
 */
export default () => Math.random().toString(36).substr(2, 12)
