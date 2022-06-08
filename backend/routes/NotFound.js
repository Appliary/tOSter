import Chalk from 'chalk';
import Logs from '../utils/Logs.js';

export default function NotFound(req, res) {
  Logs.warn('API', `Api '${Chalk.underline(req.path)}' not found`);
  res.statusCode = 404;
  res.end('Not found');
}
