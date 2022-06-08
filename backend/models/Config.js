import Chalk from 'chalk';
import NiceWare from 'niceware';
import { Document } from 'camo';

import Logs from '#Utils/Logs';

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
init('logLevel', 'info');
init('password', () => NiceWare.generatePassphrase(4).join('-'));
init('brightness', 1);

function init(key, value) {
  setImmediate(async () => {
    // Abort if we have already in DB
    if (await Config.count({ _id: key })) return;

    // Exec func
    if (typeof value === 'function') value = value();

    // Save
    Config.create({ _id: key, value }).save();

    // Log
    Logs.verbose('CONF', `Initialized config ${Chalk.blue(key)} to ${Chalk.yellow.italic(JSON.stringify(value))}`);
  });
}
