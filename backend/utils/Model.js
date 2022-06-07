import Datastore from '@seald-io/nedb';
import OS from 'os';

const DIRECTORY = '.tOSter'

export default function Model(name){
  return new Datastore({
    filename: `${OS.homedir}/${DIRECTORY}/${name}.db`,
    autoload: true
  });
}
