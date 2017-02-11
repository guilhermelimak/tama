import Event from 'src/shared/Event'

/**
 * Returns a function that return a dummy event instance used for testing
 *
 * @return   {Function}   Function that returns a new Event instance with some test data
 */
export default () => new Event({
  type: 'testEvent',
  payload: 'testPayload',
  meta: {
    publisher: 'testPub',
    recipient: 'testRec',
  },
})
