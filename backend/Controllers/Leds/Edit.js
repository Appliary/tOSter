import Led from "#Models/Led";

export default async function EditLed(req, res) {
  // Get led address
  let address = parseInt(req.param.address);

  // Save in DB
  const led = await Led.fondOneAndUpdate({
    address
  }, req.body);

  if (!led) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  return res.end(led);
}
