import Joi from 'joi'
import fecha from 'fecha'

import { logEvent, genRandomString } from 'src/util'
import { TIMESTAMP_FORMAT } from 'src/constants'

import eventSchema from 'src/shared/schemas/eventSchema'

export default class Event {
  /**
   * Build event
   *
   * @method   constructor
   *
   * @param    {String}      type      Event type
   * @param    {Payload}     payload   Event payload
   * @param    {Object}      meta
   */
  constructor(eventData) {
    let _eventData = { ...eventData }
    if (eventData.strMessage) _eventData = JSON.parse(eventData.strMessage)

    _eventData = {
      id: genRandomString(),
      type: _eventData.type,
      payload: _eventData.payload,
      meta: { ..._eventData.meta, timestamp: fecha.format(new Date(), TIMESTAMP_FORMAT) },
    }

    Joi.validate(_eventData, eventSchema, (err, val) => {
      if (err) {
        console.error(err)
        console.error('Invalid event data')
        return
      }

      this.eventData = val
    })
  }

  log() {
    logEvent(this.toObject())

    return this
  }

  updateEvent(newVal) {
    this.eventData = newVal

    return this
  }

  toObject() { return this.eventData }
  toString() { return JSON.stringify(this.eventData) }
}
