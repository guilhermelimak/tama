import Event from 'src/shared/Event'

/**
 * Return the handler associated with the event type.
 *
 * @method getEventHandler
 * @param  {Object}  event  Parsed event object
 * @return {Function}  Handler associated with the event type
 */
const getEventHandler = (event, handlers) => handlers.find(i => i.name === event.type).handler

/**
 * Validate message schema and parse the payload.
 *
 * @method parseMessage
 * @param  {Object}     strMessage Message object in string format to be JSON.parsed
 */
export default function parseMessage(strMessage, handlersList) {
  const event = new Event(JSON.parse(strMessage)).log()
  const eventObj = event.toObject()

  const handler = getEventHandler(eventObj, handlersList)

  handler(eventObj)
}
