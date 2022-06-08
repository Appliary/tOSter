import WifiScan from 'wifiscanner';
import Chalk from 'chalk';
import Logs from '#Utils/Logs';

const scanner = WifiScan();

export async function ScanWifi(req, res) {
  Logs.info('WIFI', '📶 Scanning wifi...');
  const list = await scan();

  Logs.debug('WIFI', `🔍 Found ${Chalk.yellow.bold(list.length)} wifi access points around`);
  res.json(list);
}

function scan() {
  return new Promise((resolve, reject) => {
    scanner.scan((err, d) => {
      if (err) reject(err);
      else resolve(d);
    });
  });
}
