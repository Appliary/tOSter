import Face from '#Models/Face';

export default async function AddFace(req, res) {
  const face = Face.create();
  await face.save();
  return res.json(face);
}
