import Client from 'src/Client'
import defaultOptions from 'src/client/defaultOptions'

const onSpy = jest.fn()
const sendSpy = jest.fn()
const WsClient = jest.fn(() => ({ on: onSpy, send: sendSpy }))

jest.useFakeTimers()

describe('Client', () => {
  beforeEach(() => {
    onSpy.mockClear()
    sendSpy.mockClear()
    WsClient.mockClear()
    setInterval.mockClear()
  })

  it('should create a new ws client instance', () => {
    new Client({ WsClient })
    expect(WsClient.mock.calls[0][0]).toBe(defaultOptions.url)
  })

  it('should add open ws handler', () => {
    new Client({ WsClient })
    expect(onSpy.mock.calls[0][0]).toBe('open')
    expect(onSpy.mock.calls[0][1]).toBeInstanceOf(Function)
  })

  it('should add message ws handler', () => {
    new Client({ WsClient })
    expect(onSpy.mock.calls[1][0]).toBe('message')
    expect(onSpy.mock.calls[1][1]).toBeInstanceOf(Function)
  })

  it('should emit event when the client identifier is already defined', () => {
    const client = new Client({ WsClient })
    client.identifier = '1r290j'
    client.emitEvent('register', { Lol: 'Lol' })

    setInterval.mock.calls[0][0]()
    expect(sendSpy.mock.calls.length).toBe(1)
  })

  it('should return without emiting event if the identifier is not defined', () => {
    const client = new Client({ WsClient })

    client.emitEvent('register', { Lol: 'Lol' })
    setInterval.mock.calls[0][0]()
    expect(sendSpy.mock.calls.length).toBe(0)
  })
})
