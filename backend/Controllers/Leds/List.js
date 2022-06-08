import Leds from "#Models/Leds";

export default async function LedsList(req, res) {
  const list = await Leds.findAsync({});
  return res.json(list);
}
