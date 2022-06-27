import Led from "#Models/Led";

export default async function ListLeds(req, res) {
  const count = await Led.count();
  return res.json(count);
}
