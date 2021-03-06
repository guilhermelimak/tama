import Joi from 'joi'

import { TIMESTAMP_REGEX } from 'src/util/constants'

/**
 * @param   {String} id                Event id
 * @param   {String} type              Used to identify events and run handlers
 * @param   {String} payload           Data being transfered in event
 * @param   {Object} meta              Event metadata
 * @param   {String} meta.recipient    Event recipient
 * @param   {String} meta.publisher    Event publisher
 * @param   {String} meta.timestamp    Event timestamp
 */
export default Joi.object().required().keys({
  id: Joi.string().required(),
  type: Joi.string().required(),
  payload: Joi.required(),
  meta: Joi.object().required().keys({
    recipient: Joi.string().required(),
    timestamp: Joi.string().required().regex(TIMESTAMP_REGEX),
    publisher: Joi.string().required(),
  }),
})
