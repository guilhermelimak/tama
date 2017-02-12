import Joi from 'joi'

/**
 * @param   {String}   type        Used to identify events and run handlers
 * @param   {Func}     handler     Handler to be called when the event is received
 */
export default Joi.object().keys({
  type: Joi.string().required(),
  handler: Joi.func().required(),
})
