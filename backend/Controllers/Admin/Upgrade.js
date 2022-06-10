import { exec } from 'child_process';
import Chalk from 'chalk';

import Logs from '#Utils/Logs';

export default function Upgrade(req, res) {
  // Log request
  Logs.info('ADMIN', Chalk.green.underline(`📦 Upgrading tOSter`));

  // Upgrading server
  exec('git pull --force', (error, stdout, stderr) => {
    // Send result to the frontend
    res.end(stdout);
  });
}
