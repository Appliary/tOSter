import OS from 'os';
import Chalk from 'chalk';
import WifiScan from 'wifiscanner';
import WPA_Man from 'wpasupplicant-manager';
import { exec } from 'child_process';

import Logs from '#Utils/Logs';

const scanner = WifiScan();

const GETCURRENT = (OS.platform() === 'darwin')
  ? "/Sy*/L*/Priv*/Apple8*/V*/C*/R*/airport -I | awk '/ SSID:/ {print $2}'"
  : 'iwgetid -r';

// Simulate if file not found
let WPA = {
  listwpa: [{ssid: 'simulatedList'}],
  addwpa(ssid, password) {
    this.listwpa.push({ssid});
  },
  removewpa(ssid) {
    this.listwpa = this.listwpa.filter(x=>x.ssid!=ssid);
  }
};

// Loading real WPA Supplicant file
try {
  const WPA = new WPA_Man.default();
  Logs.debug('WIFI', `📄 Loaded WPA Supplicant config file with ${Chalk.yellow.bold(WPA.listwpa.length)} entries`);
} catch(e) {
  Logs.error('WIFI', '📄 Error loading WPA Supplicant config file');
}

// list wifi settings
export async function ListWifi(req, res) {
  Logs.info('WIFI', '📶 Getting wifi list');
  res.json(WPA.listwpa.map(x=>x.ssid));
}

// Add wifi settings
export async function AddWifi(req, res) {
  if (!req.body.ssid) {
    res.statusCode = 400;
    return res.end('ssid mandatory');
  }

  WPA.addwpa(req.body.ssid, req.body.password);

  res.end('ok');
}

// Remove wifi settings
export async function RemoveWifi(req, res) {
  if (!req.params.ssid) {
    res.statusCode = 400;
    return res.end('ssid mandatory');
  }

  WPA.removewpa(req.params.ssid);

  res.end('ok');
}

// Get current
export function CurrentWifi(req, res) {
  exec(GETCURRENT, (err, stdout) => {
    if (err) {
      res.statusCode = 500;
      res.end(err.toString());
    } else {
      res.end(stdout.toString());
    }
  });
}

// List all wifi available around
export async function ScanWifi(req, res) {
  Logs.info('WIFI', '📶 Scanning wifi...');
  const list = await scan();

  Logs.debug('WIFI', `🔍 Found ${Chalk.yellow.bold(list.length)} wifi access points around`);
  res.json(list);
}

// Scanning
function scan() {
  return new Promise((resolve, reject) => {
    scanner.scan((err, d) => {
      if (err) reject(err);
      else resolve(d);
    });
  });
}
