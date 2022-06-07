import { exec } from 'child_process';

const now = new Date();

const version = now.getUTCFullYear() - 2000;
const subversion = (now.getUTCMonth()+1)*100 + now.getUTCDate();
const patch = now.getUTCHours()*100 + now.getUTCMinutes();

let v = `${version}.${subversion}.${patch}`;

exec('git branch --show-current', (err, branch) => {
  branch = branch.replace(/[^a-zA-Z0-9]/g, '');
  if (branch !== 'main') v += `-${branch}`;

  console.log('Deployed version ', v);
  exec(`npm version ${v} && git push`);
});

