import Joi from 'joi'

export default Joi.object().keys({
  name: Joi.string().require(),
  handler: Joi.function().required(),
})
