import Leds from "#Models/Leds";
import Draw from "#Utils/Draw";
import Logs from "#Utils/Logs";

export default async function LedsIdentify(req, res) {
  // Black it out
  Draw();

  // Get max ID available
  const stripLength = await Leds.countAsync();

  // Convert ID into an int, and validate
  const pos = parseInt(req.params.id);
  if(isNaN(pos) || pos <0 || pos >= stripLength) {
    res.statusCode = 404;
    return res.end(`Led "${pos}" not found. ID must be between 0 and ${stripLength}.`);
  }

  Logs.verbose('LEDS', `Identifying LED #${pos}`);

  // Creating animation for the requested LED position
  const bitmap = {
    r: Array(pos),
    g: Array(pos),
    b: Array(pos),
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
