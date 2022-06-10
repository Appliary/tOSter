import BasicAuth from 'basic-auth';
import Chalk from 'chalk';

import Logs from '#Utils/Logs';
import Config from '#Models/Config';

// Those are local adresses, who don't need authentication
const LOCAL = [
  '127.0.0.1',
  '::1',
];

export default async function Auth(req, res, next) {
  // Localhost, no pass required
  if (isLocal(req)) {
    Logs.silly('AUTH', Chalk.gray(`🔓 Local request from '${req.connection.remoteAddress}', no auth required`));
    return next();
  }

  // Get creds
  const creds = BasicAuth(req);

  // If creds
  if (creds) {
    if (await check(creds.pass)){
      Logs.silly('AUTH', Chalk.green('🔐 Credentials OK'));
      return next();
    } else {
      Logs.warn('AUTH', Chalk.red(`🗝 Wrong key`));
      res.set('WWW-Authenticate', 'Basic realm="tOSter: Wrong, retry"');
      return res.status(401).send("🙅🏻 Forbidden");
    }
  }

  // If no valid creds
  Logs.silly('AUTH', Chalk.yellowBright(`🔒 Asking for credentials to '${req.connection.remoteAddress}'`));
  res.set('WWW-Authenticate', 'Basic realm="tOSter: Please login"');
  return res.status(401).send("🙅🏻 Forbidden");
};

// Checking if it's local request
function isLocal(req) {
  return LOCAL.includes(req.connection.remoteAddress);
}

async function check(pass) {
  const conf = (await Config.findOne({ _id: "password" })) || '';
  Logs.silly('AUTH', 'Checking password', pass, conf);
  return pass == conf;
}
