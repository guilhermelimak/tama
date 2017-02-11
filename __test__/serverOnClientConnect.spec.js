import Joi from 'joi'
import { encode } from 'base-64'

import onClientConnect from 'src/server/onClientConnect'
import eventSchema from 'src/shared/schemas/eventSchema'

const addConnection = jest.fn()
const send = jest.fn()

const connections = { addConnection }
const socket = {
  upgradeReq: {
    connection: {
      remoteAddress: 'testAddress',
    },
  },
  send,
}

const encodedId = encode(socket.upgradeReq.connection)

describe('onClientConnect', () => {
  beforeEach(() => {
    onClientConnect(socket, connections)
  })

  afterEach(() => {
    send.mockClear()
    addConnection.mockClear()
  })

  it('should call addConnection function', () => {
    expect(addConnection.mock.calls.length).toBe(1)
  })

  it('should call send event', () => {
    expect(send.mock.calls.length).toBe(1)
  })

  it('should create an id with the connection remoteAddress', () => {
    const parsedEvent = JSON.parse(send.mock.calls[0][0])
    expect(parsedEvent.meta.recipient).toBe(encodedId)
  })

  it('should send a valid register event', (done) => {
    const event = JSON.parse(send.mock.calls[0][0])
    Joi.validate(event, eventSchema, (err) => {
      expect(err).toBe(null)
      done()
    })
  })
})
