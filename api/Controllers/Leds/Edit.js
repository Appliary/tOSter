import Led from "#Models/Led";

export default async function EditLed(req, res) {
  // Get led address
  let address = parseInt(req.params.address);

  // Save in DB
  const led = await Led.findOneAndUpdate({
    address
  }, req.body);

  if (!led) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  return res.end(led);
}
