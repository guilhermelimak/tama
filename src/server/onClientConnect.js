import { encode } from 'base-64'

import Connection from 'src/server/Connection'
import Event from 'src/shared/Event'

export default (socket, connections) => {
  const socketCon = socket.upgradeReq.connection
  const id = encode(socketCon)
  const meta = { publisher: 'srv', recipient: id }

  connections.addConnection(new Connection({ ip: socketCon.remoteAddress, id, socket }))
  socket.send(new Event({ type: 'register', payload: id, meta }).toString())
}
