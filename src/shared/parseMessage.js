import Event from 'src/shared/event'

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
 * Create event instance with strMessage and call the event handler if
 * the event type is found.
 *
 * @method parseMessage
 * @param  {Object}  strMessage     Message object in string format to be JSON.parsed
 * @param  {Array}   handlersList   Handlers list to search the handler to be called
 */
export default function (strMessage, handlersList, context) {
  const eventObj = new Event({ strMessage }).toObject()
  console.log(eventObj.type)
  const handler = getEventHandler(eventObj, handlersList)

  if (handler) handler(eventObj.payload, context)
}
