import Event from 'src/shared/event'

/**
 * Return the handler associated with the event type.
 *
 * @param  {Object}   e          Event object
 * @param  {Object}   handlers   Handlers list to find the handler in.

 * @return {Func}     Handler associated with the event name
 */
const getHandler = (e, handlers) => {
  const event = handlers.find(i => i.type === e.type)

  if (!event) return undefined

  return event.handler.bind(this)
}

/**
 * Create event instance with strMessage and call the event handler if
 * the event type is found.
 *
 * @param  {Object}   strMessage     Message object in string format to be JSON.parsed
 * @param  {Array}    handlersList   Handlers list to search the handler to be called
 *
 * @return {Function} handler        handler function matching the event name
 */
export default (strMessage, handlers) => getHandler(new Event({ strMessage }).toObj(), handlers)
