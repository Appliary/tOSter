import Express from 'express';
import BodyParser from 'body-parser';
import Chalk from 'chalk';

import Auth from '../middlewares/Auth.js';
import PoweredBy from '../middlewares/PoweredBy.js';
import Logs from './Logs.js';
import Methods from './Methods.js';

const PORT = process.env.PORT || 80;
const Server = Express();

// Registering plugins
Server.use(BodyParser.urlencoded({ extended: false }));
Server.use(Auth);
Server.use(PoweredBy);
Server.use(Express.static('frontend/build'));

// Registering routes
function Route(method) {
  const METHOD = method.toUpperCase();
  const m = method.toLowerCase();

  if (!Methods[METHOD]) {
    return Logs.error('API', `🛣  Method not found: "${METHOD}"`);
  }

  return (path, handlerFile) => {
    try{
      const module = import(`../routes/${handlerFile}`);
      Server[m](path, async (req, res) => (await module).default(req, res));
      Logs.verbose('API', `🛣  Registered route ${Methods[METHOD]}  ${Chalk.underline(path)}`);
    } catch (e) {
      Logs.error('API', `🛣  Error registering route: "${method}"`);
    }
  }
}

export const Get = Route('GET');
export const Put = Route('PUT');
export const Post = Route('POST');
export const Patch = Route('PATCH');
export const Delete = Route('DELETE');
export const Options = Route('OPTIONS');

// Start listening
Server.listen(PORT, () => {
  Logs.info('API', `📣 Api now listening on port ${Chalk.yellowBright.bold(PORT)}`);
});
