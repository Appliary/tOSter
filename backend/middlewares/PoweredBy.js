import Chalk from 'chalk';

import Logs from '#Utils/Logs';
import Methods from '#Utils/Methods';

import Package from '../Utils/package.cjs';


export default function PoweredBy(req, res, next){
  // Log
  Logs.verbose(
    'API',
    '🌐',
    Methods[req.method] || req.method.slice(0,4).padEnd(4),
    Chalk.underline(req.path)
  );

  res.set('X-Powered-By', `tOSter v${Package.version}`);
  next();
}
