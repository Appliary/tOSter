import Face from "#Models/Face";

export default async function RemoveFace(req, res) {
  // Delete from DB
  await Face.deleteOne({ _id: req.params.id });

  // Return result
  res.statusCode = 204;
  return res.end('ok');
}
