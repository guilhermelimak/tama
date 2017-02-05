import Joi from 'joi'

import { NAMESPACE_REGEX, TIMESTAMP_REGEX } from 'src/constants'

export default Joi.object().keys({
  id: Joi.string(),
  type: Joi.string().required(),
  payload: Joi.required(),
  meta: {
    recipient: Joi.string(),
    timestamp: Joi.string().regex(TIMESTAMP_REGEX),
    publisherId: Joi.string(),
    publisherNamespace: Joi.string().regex(NAMESPACE_REGEX),
  },
})
