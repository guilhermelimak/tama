import Client from 'src/Client'
import defaultOptions from 'src/client/defaultOptions'

const onSpy = jest.fn()
const sendSpy = jest.fn()

jest.mock('ws')
const ws = require('ws')

ws.connect = jest.fn(() => ({ on: onSpy, send: sendSpy }))

jest.mock('src/shared')
const shared = require('../src/shared')

shared.parseMessage = jest.fn()

jest.useFakeTimers()

describe('Client', () => {
  beforeEach(() => {
    onSpy.mockClear()
    sendSpy.mockClear()
    setInterval.mockClear()
  })

  it('should create a new ws client instance', () => {
    new Client()
    expect(ws.connect.mock.calls[0][0]).toBe(defaultOptions.url)
  })

  it('should add open ws handler', () => {
    new Client()
    expect(onSpy.mock.calls[0][0]).toBe('open')
    expect(onSpy.mock.calls[0][1]).toBeInstanceOf(Function)
  })

  it('should add message ws handler', () => {
    new Client()
    const messageHandler = onSpy.mock.calls[1][1]

    expect(onSpy.mock.calls[1][0]).toBe('message')
    expect(messageHandler).toBeInstanceOf(Function)
    messageHandler()
    expect(shared.parseMessage.mock.calls.length).toBe(1)
  })

  it('should emit event when the client identifier is already defined', () => {
    const client = new Client()
    client.identifier = '1r290j'
    client.emitEvent('register', { Lol: 'Lol' })

    setInterval.mock.calls[0][0]()
    expect(sendSpy.mock.calls.length).toBe(1)
  })

  it('should return without emiting event if the identifier is not defined', () => {
    const client = new Client()

    client.emitEvent('register', { Lol: 'Lol' })
    setInterval.mock.calls[0][0]()
    expect(sendSpy.mock.calls.length).toBe(0)
  })

  it('should log "Connected to server" on "open" event', () => {
    new Client()
    const onOpenHandler = onSpy.mock.calls[0][1]
    console.log = jest.fn()
    onOpenHandler()
    expect(console.log.mock.calls[0][0]).toBe('Connected to server')
  })
})