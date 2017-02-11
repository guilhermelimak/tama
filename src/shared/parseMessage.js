import Event from 'src/shared/Event'

/**
 * Return the handler associated with the event type.
 *
 * @method getEventHandler
 * @param  {Object}   e          Event object
 * @param  {Object}   handlers   Handlers list to find the handler in.
 * @return {Func}     Handler associated with the event type
 */
const getEventHandler = (e, handlers) => handlers.find(i => i.type === e.type).handler.bind(this)

/**
 * Validate message schema and parse the payload.
 *
 * @method parseMessage
 * @param  {Object}     strMessage Message object in string format to be JSON.parsed
 */
export default function (strMessage, handlersList) {
  const event = new Event({ strMessage })
  const eventObj = event.toObject()
  getEventHandler(eventObj, handlersList)(eventObj.payload, this)
}
