import Face from "#Models/Face";

export default async function ListFaces(req, res) {
  const count = await Face.count();
  return res.json(count);
}
