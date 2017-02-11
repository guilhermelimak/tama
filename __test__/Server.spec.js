import Server from 'src/Server'
import ConnectionsList from 'src/server/ConnectionsList'

jest.mock('ws')
const ws = require('ws')

const onSpy = jest.fn()

ws.Server = jest.fn(() => ({ on: onSpy }))

const server = new Server()

describe('Server.js', () => {
  it('should instantiate an empty connections list on initialize', () => {
    expect(server.connections instanceof ConnectionsList).toBe(true)
    expect(server.connections.list).toEqual([])
  })

  it('should create new ws server instance on initialize', () => {
    expect(ws.Server.mock.calls.length).toBe(1)
  })

  it('should add a connection handler on server instance', () => {
    expect(onSpy.mock.calls[0][0]).toBe('connection')
    expect(onSpy.mock.calls[0][1]).toBeInstanceOf(Function)
  })

  it('should add a message handler on server instance', () => {
    expect(onSpy.mock.calls[1][0]).toBe('message')
    expect(onSpy.mock.calls[1][1]).toBeInstanceOf(Function)
  })
})
