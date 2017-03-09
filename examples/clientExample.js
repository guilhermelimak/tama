const Client = require('../dist').Client

const client = new Client()

client.emit('event', { name: 'test' })

client.connect()
