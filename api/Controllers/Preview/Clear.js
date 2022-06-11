import Draw from "#Utils/Draw";

export default function Clear(req, res) {
  Draw();
  res.end('ok');
}
