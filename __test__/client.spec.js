import Client from 'src/client.js'
import { defaultOptions } from 'src/clientModules/index.js'

const onSpy = jest.fn()
const sendSpy = jest.fn()

jest.mock('ws')
const ws = require('ws')

ws.connect = jest.fn(() => ({ on: onSpy, send: sendSpy }))

jest.mock('src/shared/index.js')
const shared = require('src/shared/index.js')

shared.parseMessage = jest.fn()

jest.useFakeTimers()

const oldclog = console.log

describe('Client', () => {
  beforeEach(() => {
    onSpy.mockClear()
    sendSpy.mockClear()
    setInterval.mockClear()
    shared.parseMessage.mockClear()
  })

  afterEach(() => {
    console.log = oldclog
  })

  it('should create a new ws client instance', () => {
    new Client().connect()
    expect(ws.connect.mock.calls[0][0]).toBe(defaultOptions.url)
  })

  it('should add open ws handler', () => {
    new Client().connect()
    expect(onSpy.mock.calls[0][0]).toBe('open')
    expect(onSpy.mock.calls[0][1]).toBeInstanceOf(Function)
  })

  it('should add message ws handler', () => {
    new Client().connect()
    const messageHandler = onSpy.mock.calls[1][1]

    expect(onSpy.mock.calls[1][0]).toBe('message')
    expect(messageHandler).toBeInstanceOf(Function)
    messageHandler()
    expect(shared.parseMessage.mock.calls.length).toBe(1)
  })

  it('should emit event when the client identifier is already defined', () => {
    const client = new Client()
    client.connect()
    client.identifier = '1r290j'
    client.emitEvent('register', { Lol: 'Lol' })

    setInterval.mock.calls[0][0]()
    expect(sendSpy.mock.calls.length).toBe(1)
  })

  it('should return without emiting event if the identifier is not defined', () => {
    const client = new Client()
    client.connect()

    client.emitEvent('register', { Lol: 'Lol' })
    setInterval.mock.calls[0][0]()
    expect(sendSpy.mock.calls.length).toBe(0)
  })

  it('should log "Connected to server" on "open" event', () => {
    new Client().connect()
    const onOpenHandler = onSpy.mock.calls[0][1]
    console.log = jest.fn()
    onOpenHandler()
    expect(console.log.mock.calls[0][0]).toBe('Connected to server')
  })

  it('should add handler when using .on method', () => {
    const c = new Client().connect()
    const eventName = 'test'

    c.on(eventName, () => {})
    expect(c.handlerManager.items.find(i => i.type === eventName)).toBeDefined()
  })
})
