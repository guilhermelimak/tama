import { encode } from 'base-64'

import Connection from 'src/server/Connection'
import Event from 'src/shared/Event'

export default (socket, connections) => {
  const socketConnection = socket.upgradeReq.connection

  const id = encode(socketConnection)
  console.log(socketConnection)
  console.log(id)

  connections.addConnection(new Connection({
    ip: socketConnection.remoteAddress,
    id,
    socket,
  }))

  const meta = {
    publisher: 'srv',
    recipient: id,
  }

  socket.send(new Event({
    type: 'register',
    payload: id,
    meta,
  }).log().toString())
}
