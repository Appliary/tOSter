import Face from '#Models/Face';
import Draw from '#Utils/Draw';

export default async function PlayFace(req, res) {
  // Get the face from DB
  const face = await Face.findOne({
    _id: req.params.id,
  }, {
    populate: true,
  });

  // If not found
  if (!face) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  Draw(face.animation);
  return res.end('ok');
}
