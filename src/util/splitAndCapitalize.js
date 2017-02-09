/**
 * Split camel case names and capitalize the letters
 *
 * @method  splitAndCapitalize
 * @param    {String}      string   Name to be split
 * @return   {String}      Splitted and capitalized name
 */
export default function splitAndCapitalize(string) {
  return string.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
}
