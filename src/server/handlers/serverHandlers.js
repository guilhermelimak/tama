export default [
  {
    name: 'connection',
    handler(socket) {
      console.log('New client connected...'.blue)
      console.log(socket)
    },
  },
]
