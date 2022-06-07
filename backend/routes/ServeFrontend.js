import Path from 'path';
import Chalk from 'chalk';
import Logs from '../utils/Logs.js';

export default function ServeFrontend(req, res) {
  // Check if asking for HTML
  if (req.headers.accept.includes('html')) {
    Logs.debug('FRONT', `Serving frontend for path '${Chalk.underline(req.path)}'`);
    res.sendFile(Path.resolve(
      Path.dirname(''),
      '..',
      'frontend',
      'build',
      'index.html'
    ));
  }

  // Otherwise, not found
  else {
    Logs.warn('FRONT', `File '${Chalk.underline(req.path)}' not found`);
    res.statusCode = 404;
    res.end('Not found');
  }
}
