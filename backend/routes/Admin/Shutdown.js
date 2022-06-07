import { exec } from 'child_process';
import Chalk from 'chalk';

import Logs from '../../utils/Logs.js';

export default function Shutdown(req, res) {
  res.end('ok');

  // Log request
  Logs.info('ADMIN', Chalk.red(`🚨 Shutting down server (requested by '${req.connection.remoteAddress}')`));

  // Shutdown
  exec('sudo shutdown');
  process.exit(0);
}
