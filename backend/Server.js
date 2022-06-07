import Express from 'express';
import BodyParser from 'body-parser';
import Chalk from 'chalk';

import Auth from './middlewares/Auth.js';
import PoweredBy from './middlewares/PoweredBy.js';
import Logs from './utils/Logs.js';

const PORT = process.env.PORT || 80;
const Server = Express();

// Registering plugins
Server.use(BodyParser.urlencoded({ extended: false }));
Server.use(Auth);
Server.use(PoweredBy);
Server.use(Express.static('frontend/build'));

// Start listening
Server.listen(PORT, () => {
  Logs.info('API', `📣 Api now listening on port ${Chalk.yellow.bold(PORT)}`);
});

export default Server;
