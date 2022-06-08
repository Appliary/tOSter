import Chalk from 'chalk';

import Logs from "../../utils/Logs.js";
import SPI from "../../utils/SPI.js";
import {Pause, Play} from "../../utils/Draw.js";

import Config from "../../models/Config.js";

const COLORS = [{r:255}, {g:255}, {b:255}, {r:255, g:255}];

let suite = [];
let animation = [];
let input = 0;
let timeout = null;
let oldAnim = [];

export default function SimonRouter(req, res) {
  // Route
  switch (req.params.action) {
    case '0':
    case '1':
    case '2':
    case '3':
      pushColor(req.params.action, res);
      break;
    case 'start':
      start();
      res.end('1');
      break;
    case 'stop':
      stop();
      res.end('stopped');
      break;
    default:
      res.statusCode = 404;
      res.end('Not found');
      Logs.warn('SIMON', `❓ Route not found: "${req.params.action}"`);
  }
}

function newColor() {
  // Restart input
  input = 0;

  // Random color
  const color = Math.floor(Math.random() * 4);
  suite.push(color);

  const rgb = COLORS[color];
  Logs.verbose('SIMON', `🎲 Adding new color : ${Chalk.bgRgb(rgb.r || 0, rgb.g || 0, rgb.b || 0)(color)}`);
  Logs.silly('SIMON', `🔢 Suite : ${suite.map(x => {
    const rgb = COLORS[x] || {};
    return Chalk.bgRgb(rgb.r || 0, rgb.g || 0, rgb.b || 0)(x);
  }).join('')}`);

  // Play animation
  playSuite();
}

function playSuite() {
  // Clear the buffer
  SPI.clear();

  // Create animation
  animation = [];
  suite.forEach(frame => animation.push(frame,null));

  // Start drawing
  drawNextFrame();
}

function drawNextFrame() {
  // Get global brightness
  const brightness = Config.findOne({ _id: 'brightness' });

  // Consume the next frame
  const frame = animation.shift();

  // If null, clear
  if (frame === null) {
    SPI.clear();
  }

  // Otherwise, set all leds to the color
  else {
    const color = COLORS[frame];
    SPI.all(color.r || 0, color.g || 0, color.b || 0, brightness || 1);
  }

  // Send command through SPI
  SPI.sync();

  // Wait for next frame
  if(animation.length) timeout = setTimeout(drawNextFrame, 500);
}

function start() {
  // Pause previous animation
  Pause();

  Logs.info('SIMON', '👾 Starting new SIMON');
  suite = [];
  newColor();
}

function stop(){
  Logs.verbose('SIMON', `🛑 Simon stopped`);

  // Clean timeout
  if (timeout !== null) {
    clearTimeout(timeout);
    timeout = null;
  }

  suite = [];
  animation = [];
  input = 0;

  // Restart previous animation
  Play();
}

function pushColor(color, res) {
  // Check if simon is started
  if (!suite.length) {
    Logs.warn('SIMON', '❌ Simon is not started');
    res.statusCode = 400;
    return res.end('start simon first');
  }

  // Printout input
  const rgb = COLORS[color];
  Logs.debug('SIMON', `🎮 User input : ${Chalk.black.bgRgb(rgb.r || 0, rgb.g || 0, rgb.b || 0)(color)}`);

  // Not the same color
  if (color != suite[input]) {
    stop();
    const c = COLORS[suite[input]];
    const correct = Chalk.black.bgRgb(c.r || 0, c.g || 0, c.b || 0)(suite[input]);
    Logs.debug('SIMON', `😞 GAME OVER : Correct was ${correct}`);
    res.end('game over');
  }

  // Round is complete
  else if (++input >= suite.length) {
    newColor();
    res.end(suite.length.toString());
  }

  // Waiting for next color
  else {
    res.end('next');
  }
}
