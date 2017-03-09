import { Server } from 'ws'
import 'colors'

import {
  registerClient,
  defaultOptions,
  RoomManager,
} from 'src/serverModules/index.js'

import { Event, List, parseMessage } from 'src/shared'

export default class RemServer {
  /**
   * Create a new server instance
   *
   * @param    {Object}      opt                  Options object
   * @param    {String}      opt.host             Host address to listen in. (Default: '0.0.0.0')
   * @param    {Number}      opt.port             Port to listen in. (Default: 9000)
   * @param    {Array}       opt.handlers         Array of event handler objects to be added to
   *                                              instance
   */
  constructor(opt) {
    this.options = Object.assign(defaultOptions, opt)

    this._connectionsList = new List()

    this._handlersList = new List(this.options.handlers, 'type')

    this._roomManager = new RoomManager()

    this._listen()
  }

  _listen() {
    this.ws = new Server({ port: this.options.port, host: this.options.host })

    this.ws.on('connection', (socket) => {
      const connection = registerClient(socket)
      this._connectionsList.add(connection)
    })

    this.ws.on('message', msg => parseMessage(msg, this._handlersList.items))
  }

  /**
   * Send event to all connected connections
   *
   * @param    {Event}  event  Event instance to be sent
   */
  emitToAll(event) {
    if (!(event instanceof Event)) {
      return console.error('Argument event is not an instance of the Event class')
    }

    this._connectionsList.items.forEach(connection => connection.socket.send(event))

    return this
  }

  /**
   * Broadcast to all clients connected in a room
   *
   * @param  {Event}  event     Event instance to be sent
   * @param  {String} roomName  Room name
   */
  emitToRoom(event, roomName) {
    const clients = this._roomManager.getClientsFromRoom(roomName)

    this._connectionsList.items.forEach((c) => {
      clients.forEach((i) => {
        if (c.id === i) c.socket.send(event)
      })
    })
  }


  /**
   * Emit event to one connection
   *
   * @param  {Event}  event     Event instance to be sent
   * @param  {String} socketId  Connection to send the event to
   */
  emit(event, socketId) {
    if (!(event instanceof Event)) {
      return console.error('Argument event is not an instance of the Event class')
    }

    this._connectionsList.items.find(c => c.id === socketId).socket.send(event)

    return this
  }

  /**
   * Close connection and shut down the server
   */
  close() { this.ws.close(); return this }

  /**
   * Add event handler
   *
   * @param  {String} type    [description]
   * @param  {Function} handler [description]
   */
  on(type, handler) {
    this._handlersList.add({ type, handler })
  }

  get ws() { return this._ws }
  set ws(val) { this._ws = val }

  get handlers() { return this._handlersList.items }
  get connections() { return this._connectionsList.items }

  get options() { return this._options }
  set options(val) { this._options = val }
}
