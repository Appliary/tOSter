#!/usr/bin/env node
import Chalk from 'chalk';

import { Get, Put, Post, Patch, Delete, Options } from './utils/Api.js';
import Logo from './utils/Logo.js';
import Logs from './utils/Logs.js';
import Package from './utils/package.cjs';

// First prints
Logo();
Logs.info('BOOT', `✅ Started t${Chalk.bold.blueBright('OS')}ter ${Chalk.underline.green(`v${Package.version}`)}`);

// Setting routes
Get('/Admin/Reboot', 'Admin/Reboot.js');
Get('/Admin/Shutdown', 'Admin/Shutdown.js');
Get('/Admin/Upgrade', 'Admin/Upgrade.js');

Get('/Leds', 'Leds/List.js');
Get('/Leds/:id/Identify', 'Leds/Identify.js');

Get('/Apps/Simon/:action', 'Apps/Simon.js');
Get('/Apps/Rainbow/:action', 'Apps/Rainbow.js');

Get('*', 'ServeFrontend.js');

// Handle process exits
process
  .on('SIGINT', () => {
    Logs.info('BOOT', `❎ ${Chalk.bold('SIGINT:')} Shutting down t${Chalk.bold.blueBright('OS')}ter\n\n\n`);
    process.exit(0);
  })
  .on('uncaughtException', (e) => {
    Logs.fatal('BOOT', `❌ ${Chalk.bold.red('Uncaught exception:')}`, e.stack);
  });
