import Led from "#Models/Led";

export default async function AddLed(req, res) {
  // Get led address
  let address = parseInt(req.param.address);
  if (!address) address = await Led.count();

  // Shift greater addresses
  const needsToBeShifted = await Led.find({
    address: {$gte: address},
  }, {
    sort: 'address'
  });

  // Shifting each led, starting from the highest
  let led;
  while (led = needsToBeShifted.pop()) {
    led.address++;
    await led.save();
  }

  // Create new led
  led = Led.create({
    ...(req.body || {}),
    address,
  });

  // Save into DB
  await led.save();

  // Return result
  return res.json(led);
}
