import Chalk from 'chalk';

import Config from '#Models/Config';

const LEVELS = {
  'fatal': 'red',
  'error': 'redBright',
  'warn': 'yellow',
  'info': 'green',
  'verbose': 'cyan',
  'debug': 'blue',
  'silly': 'blackBright',
};
const LVL = Object.keys(LEVELS);

let logLevel = 'silly';
try {
  logLevel = Config.findOne({ _id: "logLevel" }).value || 'info';
} catch(e) {}

// Overriding with env var
if (process.env.LOGLEVEL) logLevel = process.env.LOGLEVEL;

logLevel = LVL.indexOf(logLevel.toLowerCase());
if (logLevel == -1) logLevel = 3;

export default {
  fatal (context, ...messages) {
    log('error', 'fatal', context, messages);
    process.exit(1);
  },

  error (context, ...messages) {
    log('error', 'error', context, messages);
  },

  warn (context, ...messages) {
    log('warn', 'warn', context, messages);
  },

  info (context, ...messages) {
    log('info', 'info', context, messages);
  },

  verbose (context, ...messages) {
    log('info', 'verbose', context, messages);
  },

  debug (context, ...messages) {
    log('info', 'debug', context, messages);
  },

  silly (context, ...messages) {
    log('info', 'silly', context, messages);
  },
}

function log(method, level, context, messages) {
  // Avoid lower and unknown levels
  if (!LVL.includes(level)) return console.error(`Unknown log level: ${level}`);
  if (LVL.indexOf(level)>logLevel) return;

  const ctxt = Chalk.inverse(`[${context.slice(0,5).toUpperCase().padEnd(5)}]`);
  const lvl = Chalk[LEVELS[level]](level.slice(0,5).padStart(5));
  console[method](ctxt, lvl, '│', messages.join(' '));
}
