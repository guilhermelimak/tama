import 'colors'

/**
 * Print event metadata and payload on console.
 *
 * @method logEvent
 * @param    {Event}    event       Event to be logged
 * @return   {Event}    Return the event so this call can be chained with others
 */
export default (event) => {
  if (!event || !event.meta) return event
  console.log('============================================='.green)
  console.log('| type:       '.yellow + `${event.type}`.underline.blue)
  console.log('| timestamp:  '.yellow + `${event.meta.timestamp}`.underline.blue)
  console.log('| publisher:  '.yellow + `${event.meta.publisher}`.underline.blue)
  console.log('| recipient:  '.yellow + `${event.meta.recipient}`.underline.blue)
  console.log('| payload:    '.yellow + `${JSON.stringify(event.payload)}`.underline.blue)
  console.log('============================================='.green)

  return event
}
