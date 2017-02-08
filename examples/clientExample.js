const Client = require('../dist').Client

const client = new Client({
  // handlers: [
  //   {
  //     name: 'open',
  //     handler: socket => console.log('Open 2'),
  //   },
  // ],
})


setTimeout(() => {
  client.emitEvent('event', { name: 'test' })
}, 10000)
