import FS from 'fs';
import Path from 'path';

export default function Logo(){
  const file = Path.resolve(
    Path.dirname(''),
    'resources',
    'logo.ansi'
  );

  const content = FS.readFileSync(file);

  process.stdout.write(content);
}
