import parseMessage from 'src/shared/parseMessage'
import dummyEvent from '__test__/util/dummyEvent'

describe('parseMessage', () => {
  it('should parse the string message and create a new event', () => {
    const handlers = [{
      type: 'testEvent',
      handler() {},
    }]
    parseMessage(dummyEvent().toString(), handlers)
  })
})
