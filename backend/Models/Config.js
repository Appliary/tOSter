import Chalk from 'chalk';
import NiceWare from 'niceware';
import { Document } from 'camo';

import { Init } from '#Utils/DB';

export default class Config extends Document {
  preValidate() {
    if (this._id === 'brightness') this._schema.value = {
      type: Number,
      min: 0,
      max: 1,
    };

    if (this._id === 'logLevel') this._schema.value = {
      type: String,
      choices: ['silly', 'debug', 'verbose', 'info', 'warn', 'error', 'fatal', undefined],
    };

    if (this._id === 'password') this._schema.value = {
      type: String,
    };
  }
}

// Initial config
Init(Config, { _id: 'logLevel', value: 'info' });
Init(Config, { _id: 'password', value: () => NiceWare.generatePassphrase(4).join('-') });
Init(Config, { _id: 'brightness', value: 1 });
