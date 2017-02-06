import Event from 'src/socket/Event'
import handlers from 'src/socket/handlers'
import { logMessage } from 'src/util'

/**
 * Return the handler associated with the event type.
 *
 * @method parseType
 * @param  {Object}  event  Parsed event object
 * @return {Function}  Handler associated with the event type
 */
const parseType = event => handlers.find(i => i.name === event.type).handler

/**
 * Validate message schema and parse the payload.
 *
 * @method parseMessage
 * @param  {Object}     strMessage Message object in string format[
 */
export default function parseMessage(strMessage) {
  const message = logMessage(JSON.parse(strMessage))
  const event = new Event(message)
  const eventObj = event.toObject()
  const handler = parseType(eventObj)

  handler(eventObj)
}
