export default [
  {
    type: 'register',
    /* eslint-disable no-param-reassign */
    handler: (id, instance) => (instance.identifier = id),
  },
]
