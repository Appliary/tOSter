import { Pause, Play } from "#Utils/Draw";
import Logs from "#Utils/Logs";
import SPI from "#Utils/SPI";
import Config from "#Models/Config";

const FRAMERATE = 20; //ms
const SHIFT = 4;
let interval = null;
let brightness = { value:1 };

export default async function Rainbow(req, res) {
  // Route
  switch (req.params.action) {
    case 'start':
      start(req, res);
      brightness = await Config.findOne({ _id: 'brightness' });
      break;
    case 'stop':
      stop(req, res);
      break;
    default:
      res.statusCode = 404;
      res.end('Not found');
      Logs.warn('RNBW', `❓ Route not found: "${req.params.action}"`);
  }
}


function start(req, res) {
  Logs.info('RAINBOW', '🌈 Starting rainbow');
  Logs.silly('RAINBOW', '🏳️‍🌈 Prolongated viewing of the rainbow mode may spread LGBTQIA+ acceptance.');

  // Stop current
  Pause();

  interval = setInterval(draw, FRAMERATE);
  draw();

  res.end('started');
}

function stop(req, res) {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }

  // Stop
  Play();

  res.end('stopped');
}

let color = [255, 0, 0];

function draw() {
  // Shifting color
  if (color[0] && !color[2]) {
    color[0]-= SHIFT;
    color[1]+= SHIFT;
  } else if(color[1] && !color[0]) {
    color[1]-= SHIFT;
    color[2]+= SHIFT;
  } else {
    color[2]-= SHIFT;
    color[0]+= SHIFT;
  }

  // Stay in range
  color = color.map(c => {
    if (c < 0) return 0;
    if (c > 255) return 255;
    return c;
  });

  // Set all leds
  SPI.all(color[0], color[1], color[2], brightness.value);
  SPI.sync();
}
