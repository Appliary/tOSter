import BasicAuth from 'basic-auth';
import Chalk from 'chalk';

import Logs from '../utils/Logs.js';

// Those are local adresses, who don't need authentication
const LOCAL = [
  '127.0.0.1',
  '::1',
];

const METHODS = {
  'GET': Chalk.bold.cyan('GET '),
  'POST': Chalk.bold.green('POST'),
  'PATCH': Chalk.bold.blue('PTCH'),
  'PUT': Chalk.bold.yellow('PUT '),
  'DELETE': Chalk.bold.red('DEL '),
  'OPTION': Chalk.bold.grey('OPT '),
}

export default function Auth(req, res, next) {
  Logs.verbose('API', '🌐', METHODS[req.method] || req.method.slice(0,4).padEnd(4), Chalk.underline(req.path));

  // Localhost, no pass required
  if (isLocal(req)) {
    Logs.silly('AUTH', Chalk.gray(`🔓 Local request from '${req.connection.remoteAddress}', no auth required`));
    return next();
  }

  // Get creds
  const creds = BasicAuth(req);

  // If creds OK
  if (creds && check(creds.pass)) {
    Logs.silly('AUTH', Chalk.green('🔐 Credentials OK'));
    return next();
  }

  // If no valid creds
  Logs.silly('AUTH', Chalk.yellowBright(`🔒 Asking for credentials to '${req.connection.remoteAddress}'`));
  res.set('WWW-Authenticate', 'Basic realm="tOSter"');
  return res.status(401).send("🙅🏻 Forbidden");
};

// Checking if it's local request
function isLocal(req) {
  return LOCAL.includes(req.connection.remoteAddress);
}
