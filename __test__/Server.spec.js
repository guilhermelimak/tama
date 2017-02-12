import Server from 'src/Server'
import ConnectionsList from 'src/server/ConnectionsList'
import Connection from 'src/server/Connection'

import defaultOptions from 'src/server/defaultOptions'
import dummyEvent from '__test__/util/dummyEvent'

const onSpy = jest.fn()
const closeSpy = jest.fn()

console.error = jest.fn()

const WsServer = jest.fn(() => ({ on: onSpy, close: closeSpy }))

const options = { WsServer }


describe('Server.js', () => {
  afterEach(() => {
    WsServer.mockClear()
    onSpy.mockClear()
  })

  it('should instantiate an empty connections list on initialize', () => {
    const server = new Server(options)
    expect(server.connections instanceof ConnectionsList).toBe(true)
    expect(server.connections.list).toEqual([])
  })

  it('should create new ws server instance on initialize', () => {
    new Server(options)
    expect(WsServer.mock.calls.length).toBe(1)
  })

  it('should close ws instance when calling close', () => {
    const server = new Server(options)
    server.close()

    expect(server.ws.close.mock.calls.length).toBe(1)
  })

  describe('Default ws handlers', () => {
    it('should add a connection handler on server instance', () => {
      new Server(options)
      expect(onSpy.mock.calls[0][0]).toBe('connection')
      expect(onSpy.mock.calls[0][1]).toBeInstanceOf(Function)
    })

    it('should add a message handler on server instance', () => {
      new Server(options)
      expect(onSpy.mock.calls[1][0]).toBe('message')
      expect(onSpy.mock.calls[1][1]).toBeInstanceOf(Function)
    })
  })

  it('should merge host and port options and use them when instantiating ws server', () => {
    const opt = { host: '666.666.666.666', port: 666 }
    new Server(opt)

    expect(WsServer.mock.calls[0][0].port).toBe(opt.port)
    expect(WsServer.mock.calls[0][0].host).toBe(opt.host)
  })

  it('should use the default options when no parameter is passed', () => {
    const server = new Server(options)
    expect(server.options).toEqual(defaultOptions)
  })

  it('should merge handlers when passed in args', () => {
    const handlers = [{ ev1: () => 'r1' }, { ev2: () => 'r2' }, { ev3: () => 'r3' }]
    const server = new Server({ handlers })
    expect(server.handlers).toEqual(handlers)
  })

  describe('emitEvent', () => {
    it('should emit event to a specific client using it\'s id', () => {
      const server = new Server(options)
      const send = jest.fn()
      const socketId = 'ihf3o29210h'

      const connection = new Connection({
        ip: '192.168.0.1',
        id: socketId,
        socket: { send },
      })

      server.connections.addConnection(connection)
      server.emitEvent(dummyEvent(), socketId)

      expect(send.mock.calls.length).toBe(1)
    })

    it('should fail when sending event that is not an instance of the Event class', () => {
      const server = new Server(options)
      expect(server.emitEvent('wrongEvent', 'id')).toThrow()
    })
  })

  describe('broadcastEvent', () => {
    it('should broadcast event to all connected clients', () => {
      const server = new Server(options)
      const spyObj = [jest.fn(), jest.fn(), jest.fn()]

      spyObj.forEach((send, index) => {
        server.connections.addConnection(new Connection({
          ip: '192.168.0.1',
          id: index,
          socket: { send },
        }))
      })

      server.broadcastEvent(dummyEvent())
      spyObj.forEach(i => expect(i.mock.calls.length).toBe(1))
    })

    it('should fail when sending event that is not an instance of the Event class', () => {
      const server = new Server(options)
      expect(server.broadcastEvent('wrongEvent')).toThrow()
    })
  })
})
