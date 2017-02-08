export default (message) => {
  if (!message || !message.meta) return message
  console.log('============================================='.green)
  console.log('| type:       '.yellow + `${message.type}`.underline.blue)
  console.log('| timestamp:  '.yellow + `${message.meta.timestamp}`.underline.blue)
  console.log('| publisher:  '.yellow + `${message.meta.publisher}`.underline.blue)
  console.log('| recipient:  '.yellow + `${message.meta.recipient}`.underline.blue)
  console.log('| payload:    '.yellow + `${JSON.stringify(message.payload)}`.underline.blue)
  console.log('============================================='.green)

  return message
}
