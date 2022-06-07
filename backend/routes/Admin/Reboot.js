import { exec } from 'child_process';
import Chalk from 'chalk';

import Logs from '../../utils/Logs.js';

export default function Reboot(req, res) {
  res.end('ok');

  // Log request
  Logs.info('ADMIN', Chalk.red(`🚨 Rebooting server (requested by '${req.connection.remoteAddress}')`));

  // reboot
  exec('sudo reboot');
  process.exit(0);
}
