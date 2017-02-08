export default (message) => {
  if (!message.meta) return message
  console.log(`
=============================================.green
| ${'Event: '.yellow} + ${message.type}
| ${'at:    '.yellow} + ${message.meta.timestamp}
| ${'from:  '.yellow} + ${message.meta.publisher}
| ${'to:    '.yellow} + ${message.meta.recipient}
============================================='.green
`)

  return message
}
