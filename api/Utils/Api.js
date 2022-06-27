import Express from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';
import Chalk from 'chalk';

import Auth from '#Middlewares/Auth';
import PoweredBy from '#Middlewares/PoweredBy';
import Methods from '#Utils/Methods';
import Logs from '#Utils/Logs';

const PORT = process.env.PORT || 80;
const Server = Express();

// Registering plugins
Server.use(BodyParser.urlencoded({ extended: false }));
Server.use(Cors());
Server.use(PoweredBy);
Server.use(Auth);
Server.use(Express.static('client/build'));

// Registering routes
function Route(method) {
  const METHOD = method.toUpperCase();
  let m = method.toLowerCase();
  if (m == '*') m = 'all';

  if (!Methods[METHOD]) {
    return Logs.error('API', `🛣  Method not found: "${METHOD}"`);
  }

  // Load handler from file
  return (path, file, exp = 'default') => {
    let module;

    try {
      // Load module
      Logs.silly('API', `🎛  Loading controller ${Chalk.underline(`Controllers/${file}.js`)}`);
      module = import(`../Controllers/${file}.js`);
    } catch (e) {
      Logs.error('API', `🛣  Error loading controller ${Chalk.underline(`Controllers/${file}.js`)}`, e);
    }

    try {
      // Build handler
      const handlerBuilder = async (req, res) => {
        const controller = await module;
        const handler = controller[exp || 'default'] || controller.default;
        return handler(req, res);
      };

      // Register to server
      Server[m](path, handlerBuilder);

      // Printout
      Logs.verbose('API', `🛣  ${Chalk.green.bold('Registered route')} ${Methods[METHOD]} ${Chalk.underline(path)}`);
    } catch (e) {
      Logs.error('API', `🛣  Error registering route ${Methods[METHOD]} ${Chalk.underline(path)}`, e);
    }
  }
}

// Exporting methods
export const Get = Route('GET');
export const Put = Route('PUT');
export const Post = Route('POST');
export const Patch = Route('PATCH');
export const Delete = Route('DELETE');
export const Options = Route('OPTIONS');
export const Any = Route('*');

// Start listening
Server.listen(PORT, () => {
  Logs.info('API', `📣 Api now listening on port ${Chalk.yellowBright.bold(PORT)}`);
});
