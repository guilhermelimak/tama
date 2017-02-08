import Joi from 'joi'

export default Joi.object().keys({
  type: Joi.string().required(),
  handler: Joi.func().required(),
})
