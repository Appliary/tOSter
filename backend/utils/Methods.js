import Chalk from 'chalk';

export default {
  'GET': Chalk.bold.cyan('GET '),
  'POST': Chalk.bold.green('POST'),
  'PATCH': Chalk.bold.blue('PTCH'),
  'PUT': Chalk.bold.yellow('PUT '),
  'DELETE': Chalk.bold.red('DEL '),
  'OPTIONS': Chalk.bold.grey('OPT '),
  '*': Chalk.bold.magenta('*   '),
}
