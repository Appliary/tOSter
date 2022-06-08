import Datastore from '@seald-io/nedb';
import OS from 'os';
import Joi from 'joi';
import Chalk from 'chalk';

import Logs from '#Utils/Logs';

const DIRECTORY = '.tOSter'

export default function Model(name, schema = Joi.any()) {
  const db = new Datastore({
    filename: `${OS.homedir}/${DIRECTORY}/${name}.db`,
    autoload: true
  });

  return new Proxy({}, {
    get(_, action) {
      // Logs.silly('MODEL', `${Chalk.cyan(name)}.${Chalk.bold.blue(action)}`);
      switch (action) {
        case 'Init':
          return Init(db);
        case 'update':
        case 'updateAsync':
          return update(schema, db[action].bind(db));
        case 'insert':
        case 'insertAsync':
          return insert(schema, db[action].bind(db));
        default:
          return db[action];
      }
    },
  });
}

function insert(schema, cb) {
  return (elem, ...args) => {
    // Ensure it's an array
    if (!Array.isArray(elem)) elem = [elem];

    const validation = Joi.array().items(schema).validate();

    if (validation.error) {
      Logs.warn('MODEL', 'Validation error on insert', Chalk.grey.italic(JSON.stringify(elem)))
      throw new Error(validation.error);
    }

    return cb(elem, ...args);
  };
}

function update(schema, cb) {
  return (filter, elem, ...args) => {
    const validation = schema.validate(elem);

    if (validation.error) {
      Logs.warn('MODEL', 'Validation error on update', Chalk.grey.italic(JSON.stringify(elem)))
      throw new Error(validation.error);
    }

    return cb(elem, ...args);
  };
}

function Init(db) {
  return (elem) => {
    db
      .insertAsync(elem)
      .then(() => Logs.verbose('MODEL', `Initialized ${Chalk.italic.grey(JSON.stringify(elem))}`))
      .catch(() => {});
  };
}
