import Joi from 'joi'
import fecha from 'fecha'

import { genRandomString } from 'src/util'
import eventSchema from 'src/socket/schemas/eventSchema'
import { TIME_FORMAT } from 'src/constants'

export default class Event {
  /**
   * Build event
   *
   * @method   constructor
   *
   * @param    {String}      type      Event type
   * @param    {Payload}     payload   Event payload
   * @param    {Object}      meta      Event metadata
   */
  constructor(type, payload, meta) {
    const eventData = {
      _id: genRandomString(),
      type,
      payload,
      meta: {
        ...meta,
        timestamp: fecha.format(new Date(), TIME_FORMAT),
      },
    }

    Joi.validate(eventData, eventSchema, (err, val) => {
      if (err) {
        console.error(err)
        console.error('Invalid event data')
        return
      }

      this.eventData = val
    })
  }

  toObject() {
    return this.eventData
  }

  toString() {
    return JSON.stringify(this.eventData)
  }

  updateEvent(newVal) {
    this.eventData = newVal
  }
}
