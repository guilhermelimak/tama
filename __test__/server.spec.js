import Server from 'src/server.js'
import { Connection, defaultOptions } from 'src/serverModules/index.js'
import { List } from 'src/shared/index.js'
import dummyEvent from '__test__/util/dummyEvent.js'
import dummySocket from '__test__/util/dummySocket.js'

jest.mock('src/shared/index.js')
const sharedModules = require('../src/shared/index.js')

sharedModules.parseMessage = jest.fn()

jest.mock('src/serverModules/index.js')
const serverModules = require('src/serverModules/index.js')

serverModules.registerClient = jest.fn()

jest.mock('ws')
const ws = require('ws')

console.error = jest.fn()

const on = jest.fn()
const closeSpy = jest.fn()
ws.Server = jest.fn(() => ({ on, close: closeSpy }))

describe('Server.js', () => {
  afterEach(() => {
    ws.Server.mockClear()
    serverModules.registerClient.mockClear()
    sharedModules.parseMessage.mockClear()
    on.mockClear()
  })

  it('should instantiate an empty connections list on initialize', () => {
    const server = new Server().listen()
    expect(server._connectionsList instanceof List).toBe(true)
    expect(server.connections).toEqual([])
  })

  it('should create new ws server instance on initialize', () => {
    new Server().listen()
    expect(ws.Server.mock.calls.length).toBe(1)
  })

  it('should close ws instance when calling close', () => {
    const server = new Server().listen()
    server.close()

    expect(server.ws.close.mock.calls.length).toBe(1)
  })

  describe('Default ws handlers', () => {
    it('should add a connection handler on server instance', () => {
      new Server().listen()
      expect(on.mock.calls[0][0]).toBe('connection')
      expect(on.mock.calls[0][1]).toBeInstanceOf(Function)
    })

    it('should add a message handler on server instance', () => {
      new Server().listen()
      expect(on.mock.calls[1][0]).toBe('message')
      expect(on.mock.calls[1][1]).toBeInstanceOf(Function)
    })

    it('should add a handler when using the .on method', () => {
      const s = new Server().listen()
      const a = jest.fn()
      const oldListLength = s.handlers.length
      s.on('test', a)
      const newListLenght = s.handlers.length
      expect(newListLenght - oldListLength).toBe(1)
    })

    it('should call parseMessage handler when receiving a message event', () => {
      new Server().listen()
      const messageHandler = on.mock.calls[1][1]
      messageHandler()
      expect(sharedModules.parseMessage.mock.calls.length).toBe(1)
    })

    it('should call registerClient handler when a new client connects', () => {
      new Server().listen()
      const messageHandler = on.mock.calls[0][1]
      messageHandler(dummySocket())
      expect(serverModules.registerClient.mock.calls.length).toBe(1)
    })
  })

  it('should merge host and port options and use them when instantiating ws server', () => {
    const opt = { host: '666.666.666.666', port: 666 }
    new Server(opt).listen()

    expect(ws.Server.mock.calls[0][0].port).toBe(opt.port)
    expect(ws.Server.mock.calls[0][0].host).toBe(opt.host)
  })

  it('should use the default options when no parameter is passed', () => {
    const server = new Server().listen()
    expect(server.options).toEqual(defaultOptions)
  })

  it('should merge handlers when passed in args', () => {
    const handlers = [{ ev1: () => 'r1' }, { ev2: () => 'r2' }, { ev3: () => 'r3' }]
    const server = new Server({ handlers })
    expect(server.handlers).toEqual(handlers)
  })

  describe('emit', () => {
    it('should emit event to a specific client using it\'s id', () => {
      const server = new Server().listen()
      const send = jest.fn()
      const socketId = 'ihf3o29210h'

      const connection = new Connection({
        ip: '192.168.0.1',
        id: socketId,
        socket: { send },
      })

      server._connectionsList.add(connection)
      server.emit(dummyEvent(), socketId)

      expect(send.mock.calls.length).toBe(1)
    })

    it('should fail when sending event that is not an instance of the Event class', () => {
      const server = new Server().listen()
      expect(server.emit('wrongEvent', 'id')).toThrow()
    })
  })

  describe('emitToAll', () => {
    it('should broadcast event to all connected clients', () => {
      const server = new Server().listen()
      const spyObj = [jest.fn(), jest.fn(), jest.fn()]

      spyObj.forEach((send, index) => {
        server._connectionsList.add(new Connection({
          ip: '192.168.0.1',
          id: index,
          socket: { send },
        }))
      })

      server.emitToAll(dummyEvent())
      spyObj.forEach(i => expect(i.mock.calls.length).toBe(1))
    })

    it('should fail when sending event that is not an instance of the Event class', () => {
      const server = new Server().listen()
      expect(server.emitToAll('wrongEvent')).toThrow()
    })
  })
})
