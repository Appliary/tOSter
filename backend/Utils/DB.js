import Chalk from 'chalk';
import Camo from 'camo';
import OS from 'os';
import FS from 'fs';

import Logs from '#Utils/Logs';

export const DB_URI = `nedb://${OS.homedir()}/.tOSter`;

export function DBConnect () {
  try {
    Camo.connect(DB_URI);
    Logs.verbose('DB', `🗂  Connected to the DB ${Chalk.underline.magenta(DB_URI)}`);
  } catch (e) {
    Logs.fatal('DB', `🗂  Unable to connect DB ${Chalk.underline.magenta(DB_URI)}`, e.trace)
  }
}

export function Init(model, doc) {
  setImmediate(async () => {
    // Check _id
    if(typeof doc._id != 'string') {
      Logs.error('DB', `❌ ${Chalk.red.bold('Init failed:')} you have to provide valid "_id" property`);
      return;
    }

    // Abort if we have already in DB
    if (await model.count({ _id: doc._id })) return;

    // Exec func
    Object.keys(doc)
      .forEach(prop => {
        if (typeof doc[prop] === 'function') doc[prop] = doc[prop]();
      });

    // Save
    model.create(doc).save();

    // Log
    Logs.verbose('CONF', `Initialized ${Chalk.blue(model.collectionName())} to ${Chalk.grey.italic(JSON.stringify(doc))}`);
  });
}
