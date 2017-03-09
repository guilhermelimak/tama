const Server = require('../dist').Server

const server = new Server()
server.listen()
console.log('Server listening')
