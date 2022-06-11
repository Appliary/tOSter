import Led from "#Models/Led";

export default async function RemoveLed(req, res) {
  // Get led address
  let address = parseInt(req.params.address);

  // Delete from DB
  await Led.deleteOne({ address });

  // Shift greater addresses
  const needsToBeShifted = await Led.find({
    address: {$gt: address},
  }, {
    sort: '-address'
  });

  // Shifting each led, starting from the lowest
  let led;
  while (led = needsToBeShifted.pop()) {
    led.address--;
    await led.save();
  }

  // Return result
  res.statusCode = 204;
  return res.end('ok');
}
