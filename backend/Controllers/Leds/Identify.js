import Led from "#Models/Led";
import Draw from "#Utils/Draw";
import Logs from "#Utils/Logs";

export default async function IdentifyLed(req, res) {
  // Get led address
  let address = parseInt(req.param.address);
  Logs.verbose('LEDS', `🆔 Identifying LED #${address}`);

  // Check if led exists
  const led = await Led.findOne({ address });
  if (!led) {
    res.statusCode = 404;
    res.end('Not found');
  }

  // Black it out
  Draw();

  // Creating animation for the requested LED position
  const bitmap = {
    r: Array(address),
    g: Array(address),
    b: Array(address),
  };
  bitmap.r.push({ r:255, g:0, b: 0 });
  bitmap.g.push({ r:0, g:255, b: 0 });
  bitmap.b.push({ r:0, g:0, b: 255 });

  Draw([
    {
      bitmap: bitmap.r,
      duration: 100,
    }, {
      bitmap: bitmap.g,
      duration: 100,
    }, {
      bitmap: bitmap.b,
      duration: 100,
    }
  ]);

  return res.end('ok');
}
