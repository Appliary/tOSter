#!/usr/bin/env node
import Chalk from 'chalk';

import Server from './Server.js';
import Logo from './utils/Logo.js';
import Logs from './utils/Logs.js';
import Package from './utils/package.cjs';

// Importing routes
import LedsList from './routes/Leds/List.js';
import LedsIdentify from './routes/Leds/Identify.js';
import Simon from './routes/Apps/Simon.js';
import Shutdown from './routes/Admin/Shutdown.js';
import ServeFrontend from './routes/ServeFrontend.js';

// First prints
Logs.info('BOOT', `✅ Started t${Chalk.bold.blueBright('OS')}ter ${Chalk.underline.green(`v${Package.version}`)}`);
Logo();

// Setting routes
Server
  .get('/Leds', LedsList)
  .get('/Leds/:id/Identify', LedsIdentify)

  .get('/Apps/Simon/:action', Simon)

  .get('/Admin/Shutdown', Shutdown)

  .get('*', ServeFrontend);

// Handle process exits
process
  .on('SIGINT', () => {
    Logs.info('BOOT', `❎ ${Chalk.bold('SIGINT:')} Shutting down t${Chalk.bold.blueBright('OS')}ter\n\n\n`);
    process.exit(0);
  })
  .on('uncaughtException', (e) => {
    Logs.fatal('BOOT', `❌ ${Chalk.bold.red('Uncaught exception:')}`, e.stack);
  });
