#!/usr/bin/env node
import Chalk from 'chalk';

import Logo from '#Utils/Logo';
import Logs from '#Utils/Logs';
import Draw from '#Utils/Draw';
import { DBConnect } from '#Utils/DB';
import Package from './Utils/package.cjs';

const TOSTER = `${Chalk.bold.whiteBright('t')}${Chalk.bold.blueBright('OS')}${Chalk.bold.whiteBright('ter')}`;

// First prints
Logo();
Logs.info('BOOT', `✅ Started ${TOSTER} ${Chalk.underline.green(`v${Package.version}`)}`);

// Connect to database
DBConnect();

/***** ROUTES *****/
import('./routes.js');

// Handle process exits
process
  .on('SIGINT', () => {
    Logs.info('BOOT', `❎ ${Chalk.bold('SIGINT:')} Shutting down ${TOSTER}\n\n\n`);
    Draw();
    process.exit(0);
  })
  .on('uncaughtException', (e) => {
    Logs.fatal('BOOT', `❌ ${Chalk.bold.red('Uncaught exception:')}`, e.stack);
  });
