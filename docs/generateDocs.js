import fs from 'fs'
import 'colors'
import path from 'path'
import joiToMarkdown from 'joi-to-markdown'
import splitAndCapitalize from 'src/util/splitAndCapitalize'

const SCHEMAS_FOLDER = path.join(__dirname, '/../src/shared/schemas/')

/**
 * Build markdown string to be saved in a file
 *
 * @method  buildMdString
 *
 * @param    {String}    name    Schema name (used in the markdown file as title)
 * @param    {JoiObj}    schema  Joi object containing the schema.
 * @return   {String}    Markdown string to be saved in file
 */
function buildMdString(folder, name) {
  const schema = require(`${folder}/${name}.js`)

  const table = joiToMarkdown.convertSchema(schema).md
  const splitName = splitAndCapitalize(name)

  return `### ${splitName}
${table}`
}


fs.readdirSync(SCHEMAS_FOLDER).forEach((schemaName) => {
  const cleanName = schemaName.replace('.js', '')
  const mdStr = buildMdString(SCHEMAS_FOLDER, cleanName)

  // __dirname = Docs folder
  const fileDir = `${__dirname}/schemas/${cleanName}.md`

  fs.writeFile(fileDir, mdStr, (err) => {
    if (err) return console.error('err'.red)
    return console.log(`File ${`${cleanName}.md`.blue} updated successfully`)
  })
})
