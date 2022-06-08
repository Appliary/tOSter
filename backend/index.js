#!/usr/bin/env node
import Chalk from 'chalk';
import Camo from 'camo';
import OS from 'os';
import FS from 'fs';

import Logo from '#Utils/Logo';
import Logs from '#Utils/Logs';
import Package from './Utils/package.cjs';

const DB_URI = FS.existsSync('/boot')
  ? 'nedb:///boot/tOSter.db'
  : `nedb://${OS.homedir()}/.tOSter.db`;

const TOSTER = `${Chalk.bold.whiteBright('t')}${Chalk.bold.blueBright('OS')}${Chalk.bold.whiteBright('ter')}`;

// First prints
Logo();
Logs.info('BOOT', `✅ Started ${TOSTER} ${Chalk.underline.green(`v${Package.version}`)}`);

// Connect to database
Camo.connect(DB_URI, (e) => console.log(e));
Logs.verbose('BOOT', `🗂  Connected to the DB ${Chalk.underline.magenta(DB_URI)}`);

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
