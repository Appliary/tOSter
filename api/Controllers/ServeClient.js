import Path from 'path';
import Chalk from 'chalk';
import Logs from '#Utils/Logs';

export default function ServeFrontend(req, res) {
  // Check if asking for HTML
  if (req.headers.accept.includes('html')) {
    Logs.debug('CLIENT', `Serving frontend for path '${Chalk.underline(req.path)}'`);
    res.sendFile(Path.resolve(
      Path.dirname(''),
      'client',
      'build',
      'index.html'
    ));
  }

  // Otherwise, not found
  else {
    Logs.warn('CLIENT', `File '${Chalk.underline(req.path)}' not found`);
    res.statusCode = 404;
    res.end('File not found');
  }
}
