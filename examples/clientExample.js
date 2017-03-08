const Client = require('../dist').Client

const client = new Client()

client.emitEvent('event', { name: 'test' })

client.connect()
