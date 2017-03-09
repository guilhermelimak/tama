import parseMessage from 'src/shared/parseMessage'
import dummyEvent from '__test__/util/dummyEvent'

describe('parseMessage', () => {
  it('should parse the string message and create a new event', () => {
    const handler = jest.fn()
    const handlers = [{
      type: 'testEvent',
      handler,
    }]

    parseMessage(dummyEvent().toString(), handlers)
    expect(handler.mock.calls.length).toBe(1)
  })

  it('should return undefined when event is not found in handlers list', () => {
    const result = parseMessage(dummyEvent().toString(), [])
    expect(result).not.toBeDefined()
  })
})
