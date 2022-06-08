import Joi from 'joi';
import NiceWare from 'niceware';
import Model from "#Utils/Model";

export const Schema = Joi.alternatives([
  {
    _id: 'brightness',
    value: Joi
      .number()
      .required()
      .min(0)
      .max(1)
  },
  {
    _id: 'password',
    value: Joi
      .string()
      .required()
      .min(8)
  },
  {
    _id: 'logLevel',
    value: Joi
      .string()
      .required()
      .valid('silly', 'debug', 'verbose', 'info', 'warn', 'error', 'fatal')
      .default('info')
  },
]);

const Config = Model('config', Schema);

Config.Init({ _id: 'brightness', value: 1 });
Config.Init({ _id: 'logLevel', value: 'info' });
Config.Init({ _id: 'password', value: NiceWare.generatePassphrase(4).join('-') });

export default Config;
