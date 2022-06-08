import Led from "#Models/Led";

export default async function LedsList(req, res) {
  const list = await Led.find({});
  return res.json(list);
}
