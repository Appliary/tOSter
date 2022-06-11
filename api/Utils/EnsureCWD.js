import Path from 'path';
import { fileURLToPath } from 'url';
import Logs from '#Utils/Logs';
import Chalk from 'chalk';

export default function EnsureDir() {
  const filename = fileURLToPath(import.meta.url);
  const dirname = Path.dirname(filename);
  const projectDir = Path.resolve(`${dirname}/../..`);

  if (projectDir === '.') return;

  process.chdir(projectDir);

  setImmediate(() => {
    Logs.warn('CWD', `🚀 Working directory is not project directory, moved to ${Chalk.underline.bold.yellow(projectDir)}`);
  });

}
