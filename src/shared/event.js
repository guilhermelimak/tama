import Joi from 'joi'
import fecha from 'fecha'

import { genRandomString } from 'src/util'
import { TIMESTAMP_FORMAT } from 'src/util/constants'

import eventSchema from 'src/shared/schemas/eventSchema'

export default class Event {
  /**
   * Build event.
   *
   * @method   constructor
   *
   * @param    {String}      type              Event type
   * @param    {Payload}     payload           Event payload
   * @param    {Object}      meta
   * @param    {String}      meta.recipient    Event recipient
   * @param    {String}      meta.publisher    Event publisher
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

  /**
   * Return eventData in object format.
   *
   * @method   toObject
   * @return   {Object}   EventData object
   */
  toObject() { return this.eventData }


  /**
   * Return stringified event data object to be sent in messages.
   *
   * @method   toString
   * @return   {String}   Event data stringified object
   */
  toString() { return JSON.stringify(this.eventData) }
}
