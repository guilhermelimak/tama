import { logEvent } from 'src/util'
import dummyEvent from '__test__/util/dummyEvent'

console.log = jest.fn()

describe('logEvent', () => {
  afterEach(() => console.log.mockClear())
  it('should log the event and return message', () => {
    const event = logEvent(dummyEvent().toObject())
    expect(console.log.mock.calls.length).toBeGreaterThan(0)
    expect(event).toBeDefined()
  })

  it('should return event without logging if it doesn\'t have meta property', () => {
    const event = logEvent({})
    expect(event).toEqual({})
    expect(console.log.mock.calls.length).toBe(0)
  })

  it('should return event without logging if it isn\'t defined', () => {
    const event = logEvent(undefined)
    expect(event).toEqual(undefined)
    expect(console.log.mock.calls.length).toBe(0)
  })
})
