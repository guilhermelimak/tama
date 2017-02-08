const Client = require('../dist').Client

const client = new Client()

setTimeout(() => {
  client.emitEvent('event', { name: 'test' })
}, 10)
