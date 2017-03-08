import Joi from 'joi'
import { encode } from 'base-64'

import { registerClient } from 'src/serverModules/index.js'
import eventSchema from 'src/shared/schemas/eventSchema.js'
import dummySocket from '__test__/util/dummySocket.js'

const socket = dummySocket()

const encodedId = encode(socket.upgradeReq.connection)

describe('registerClient', () => {
  beforeEach(() => registerClient(socket))
  afterEach(() => socket.send.mockClear())

  it('should call send event', () => {
    expect(socket.send.mock.calls.length).toBe(1)
  })

  it('should create an id with the connection remoteAddress', () => {
    const parsedEvent = JSON.parse(socket.send.mock.calls[0][0])
    expect(parsedEvent.meta.recipient).toBe(encodedId)
  })

  it('should send a valid register event', (done) => {
    const event = JSON.parse(socket.send.mock.calls[0][0])
    Joi.validate(event, eventSchema, (err) => {
      expect(err).toBe(null)
      done()
    })
  })
})
