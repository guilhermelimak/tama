/**
 * Return a function that returns a socket mock
 *
 * @return   {Function}   Function that returns a socket mock
 */
export default () => ({
  upgradeReq: {
    connection: {
      remoteAddress: 'testAddress',
    },
  },
  send: jest.fn(),
})
