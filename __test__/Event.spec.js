import Event from 'src/shared/Event'

const eventData = {
  type: 'testType',
  payload: 'testPayload',
  meta: {
    publisher: 'testPublisher',
    recipient: 'testRecipient',
  },
}

function eventExpect(expect, event) {
  expect(event.type).toBe(eventData.type)
  expect(event.payload).toBe(eventData.payload)
  expect(event.meta.publisher).toBe(eventData.meta.publisher)
  expect(event.meta.recipient).toBe(eventData.meta.recipient)
}

jest.mock('src/util')

console.error = jest.fn()

describe('Event', () => {
  it('should return an object from the toObject method', () => {
    const event = new Event(eventData).toObject()

    expect(typeof event).toBe('object')
  })

  it('should return a string from the toString method', () => {
    const event = new Event(eventData).toString()

    expect(typeof event).toBe('string')
  })

  it('should build the event when receiving a string', () => {
    const e = { strMessage: JSON.stringify(eventData) }
    const event = new Event(e).toObject()
    eventExpect(expect, event)
  })

  it('should fail when passing an invalid object', () => expect(new Event({})).toThrow())

  it('should build the event when receiving an object', () => {
    const event = new Event(eventData).toObject()
    eventExpect(expect, event)
  })
})
