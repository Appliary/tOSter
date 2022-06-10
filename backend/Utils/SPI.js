import { Dotstar } from "dotstar";
import SPI from "pi-spi";
import Chalk from 'chalk';

import Logs from "#Utils/Logs";
import Led from "#Models/Led";

// We try to connect to the SPI
let spi;
try {
  spi = SPI.initialize('/dev/spidev0.0');
  Logs.info('SPI', '🔌 Access to the LEDs through SPI has been initialized');
} catch(err) {
  Logs.error('SPI', `🔌 The SPI is ${Chalk.underline.red('not found')}, simulating`);
}

// Socket
const socket = {
  write(buffer, cb) {
    Logs.silly('SPI', '🖋  Writing to SPI:',
      buffer
        .toString('hex')
        .match(/.{8}/g)
        .map(x => (x=='00000000' || x== 'ffffffff')
          ? Chalk.italic.grey(x)
          : x.slice(0,2)
            + Chalk.blueBright(x.slice(2,4))
            + Chalk.greenBright(x.slice(4,6))
            + Chalk.redBright(x.slice(6,8)))
        .join(' ')
    );

    if (spi) spi.write(buffer, cb);
    simulate(buffer, cb);
  },
};

// Log led states for debug
function simulate(buffer, cb) {
  const bytes = [...buffer];

  let out = '💡 Leds state: ';
  while(bytes.length) {
    const b = [
      bytes.shift(),
      bytes.shift(),
      bytes.shift(),
      bytes.shift(),
    ];

    // Start frame
    if (b[0] + b[1] + b[2] + b[3] === 0) {
      out += '{';
    }

    // End frame
    else if (b[0] + b[1] + b[2] + b[3] === 1020) {
      out += '}';
    }

    // Color
    else {
      out += Chalk.bgBlack.bgRgb(b[3], b[2], b[1])(" ");
    }
  }

  Logs.debug('SPI', out);
  return cb();
}

// Connect to the Dotstar
let LEDS;
await setLength();

export async function setLength() {
  const length = await Led.count();

  if (length) {
    Logs.info('SPI', `🚥 Setting LED count to ${Chalk.yellow(length)}`);
  } else {
    Logs.warn('SPI', `🚥 There is ${Chalk.underline.yellow('no LED')} set, defaulting to 1`);
  }

  LEDS = new Dotstar(socket, {
    length: length || 1,
  });
}

export default LEDS;

process
  .on('SIGINT', () => {
    LEDS.clear();
    LEDS.sync();
  })
