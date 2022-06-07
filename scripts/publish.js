import { exec } from 'child_process';

const now = new Date();

const version = now.getUTCFullYear() - 2000;
const subversion = (now.getUTCMonth()+1)*100 + now.getUTCDate();
const patch = now.getUTCHours()*100 + now.getUTCMinutes();

const v = `${version}.${subversion}.${patch}`;

console.log('Setting version to', v);
exec(`npm version ${v}`);
