export const logMessage = (message) => {
  if (!message.meta) return message
  console.log('============================================='.green)
  console.log('| Event: '.yellow + `${message.type}`.underline.blue)
  console.log('| at:    '.yellow + `${message.meta.timestamp}`.underline.blue)
  console.log('| from:  '.yellow + `${message.meta.publisher}`.underline.blue)
  console.log('| to:    '.yellow + `${message.meta.recipient}`.underline.blue)
  console.log('============================================='.green)

  return message
}
