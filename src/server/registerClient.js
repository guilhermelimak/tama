import { encode } from 'base-64'

import Connection from 'src/server/Connection'
import Event from 'src/shared/Event'

/**
 * Send register event to socket and return a new connection
 *
 * @method registerSocket
 * @param    {Socket}     socket          Socket connected
 * @return   {Connection} newConnection   New Connection created with this socket data
 */
export default (socket) => {
  const socketCon = socket.upgradeReq.connection
  const id = encode(socketCon)
  const meta = { publisher: 'srv', recipient: id }

  socket.send(new Event({ type: 'register', payload: id, meta }).toString())

  return new Connection({ ip: socketCon.remoteAddress, id, socket })
}
