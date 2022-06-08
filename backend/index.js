#!/usr/bin/env node
import Chalk from 'chalk';

import Logo from '#Utils/Logo';
import Logs from '#Utils/Logs';
import Package from './Utils/package.cjs';

// First prints
Logo();
Logs.info('BOOT', `✅ Started t${Chalk.bold.blueBright('OS')}ter ${Chalk.underline.green(`v${Package.version}`)}`);

/***** ROUTES *****/
import('./routes.js');

// Handle process exits
process
  .on('SIGINT', () => {
    Logs.info('BOOT', `❎ ${Chalk.bold('SIGINT:')} Shutting down t${Chalk.bold.blueBright('OS')}ter\n\n\n`);
    process.exit(0);
  })
  .on('uncaughtException', (e) => {
    Logs.fatal('BOOT', `❌ ${Chalk.bold.red('Uncaught exception:')}`, e.stack);
  });
