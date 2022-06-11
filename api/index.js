#!/usr/bin/env node
import Chalk from 'chalk';

import Logo from '#Utils/Logo';
import Logs from '#Utils/Logs';
import { DBConnect } from '#Utils/DB';
import EnsureCWD from '#Utils/EnsureCWD';
import Package from './Utils/package.cjs';

const TOSTER = `${Chalk.bold.whiteBright('t')}${Chalk.bold.blueBright('OS')}${Chalk.bold.whiteBright('ter')}`;

// Ensure being in the project dir
EnsureCWD();

// First prints
Logo();
Logs.info('BOOT', `✅ Starting ${TOSTER} ${Chalk.underline.green(`v${Package.version}`)}`);

// Connect to database
DBConnect();

/***** ROUTES *****/
import('./routes.js');

// Handle process exits
process
  .on('SIGINT', () => {
    Logs.info('BOOT', `❎ ${Chalk.bold('SIGINT:')} Shutting down ${TOSTER}\n\n\n`);
    process.exit(0);
  })
  .on('uncaughtException', (e) => {
    Logs.fatal('BOOT', `❌ ${Chalk.bold.red('Uncaught exception:')}`, e.stack);
  });
