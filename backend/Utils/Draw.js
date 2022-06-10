import SPI from "#Utils/SPI";
import Logs from "#Utils/Logs";
import Config from "#Models/Config";

let animation = [];
let previous = [];
let timeout = null;

export default function Draw(frames){
  animation = frames || [];

  Logs.info('DRAW', `🎬 New animation set, containing ${animation.length} frames`);
  redraw();
}

async function redraw(){
  // Clear ongoing timeout
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  // Nothing, black it out
  if (!animation.length) {
    SPI.clear();
    SPI.sync();
    return;
  }

  // Get global brightness
  const brightness = await Config.findOne({ _id: 'brightness' });

  // Get frame, and reshift registry
  let frame = animation.shift();
  animation.push(frame);

  // If we have something to draw
  if (frame.bitmap) {
    frame.bitmap.forEach((pixel, pos) => {
      try {
        SPI.set(pos, pixel.r || 0, pixel.g || 0, pixel.b || 0, brightness.value || 1);
      } catch (e) {
        Logs.error('DRAW', e);
      }
    });
  }

  // Otherwise, black it out
  else {
    SPI.clear();
  }

  // Apply change
  SPI.sync();

  // Register next frame drawing
  if (frame.duration) {
    timeout = setTimeout(redraw, frame.duration);
  }
}

export function Pause() {
  if (previous.length) {
    Logs.warn('DRAW', '⏸ Already paused.');
  } else {
    Logs.verbose('DRAW', '⏸ Pausing drawing routine');
    previous = animation;
  }
  Draw();
}

export function Play() {
  Logs.verbose('DRAW', '⏯  Restarting drawing routine');
  Draw(previous);
  previous = [];
}
