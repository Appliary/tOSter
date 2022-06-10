import Draw from "#Utils/Draw";
import { ObjectProps } from "#Utils/Validate";

export default function (req, res) {
  let animation = req.body;

  // Ensure array
  if (!Array.isArray(animation)) animation = [animation];

  let badFrame = animation.findIndex(checkFrame);
  if (badFrame) {
    res.statusCode = 400;
    res.end(`Frame ${badFrame} is incorrect`);
  }

  Draw(req.body);
  res.end('ok');
}

function checkFrame(frame) {
  if (typeof frame != 'object') return true;
  if (!frame.bitmap) return true;
  if (!Array.isArray(frame.bitmap)) return true;
  return frame.bitmap.some(checkPixel);
}

function checkPixel(pixel) {
  if (typeof pixel != 'object') return true;
  if (ObjectProps) return true;
  if (checkColor(pixel.r)) return true;
  if (checkColor(pixel.g)) return true;
  if (checkColor(pixel.b)) return true;
}

function checkColor(color) {
  if (color === undefined) return false;
  if (!Number.isSafeInteger(color)) return true;
  if (color < 0) return true;
  if (color > 255) return true;
}
