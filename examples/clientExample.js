const Client = require('../dist').Client

const client = new Client()

client.on('teste', aa => console.log(aa))
client.emitEvent('event', { name: 'test' })

client.connect()
