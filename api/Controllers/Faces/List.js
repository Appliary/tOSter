import Face from "#Models/Face";

const X = {};
const O = {r: 133, g: 133, b: 133};

export default async function ListFaces(req, res) {
  const list = await Face.find({});
  return res.json([
    {
      _id: 'foo',
      name: 'Dino run',
      animation: [],
      pos: 0,
      icon: [
        X,X,X,X,X,X,X,X,X,O,O,O,O,O,O,X,
        X,X,X,X,X,X,X,X,O,O,X,O,O,O,O,O,
        X,X,X,X,X,X,X,X,O,O,O,O,O,O,O,O,
        X,X,X,X,X,X,X,X,O,O,O,O,O,X,X,X,
        X,X,X,X,X,X,X,X,O,O,O,O,O,O,O,X,
        X,X,X,X,X,X,X,X,O,O,O,O,X,X,X,X,
        O,X,X,X,X,X,X,O,O,O,O,O,X,X,X,X,
        O,X,X,X,X,X,O,O,O,O,O,O,O,O,X,X,
        O,O,X,X,X,O,O,O,O,O,O,O,X,O,X,X,
        O,O,O,X,O,O,O,O,O,O,O,O,X,X,X,X,
        X,O,O,O,O,O,O,O,O,O,O,X,X,X,X,X,
        X,X,O,O,O,O,O,O,O,O,X,X,X,X,X,X,
        X,X,X,O,O,O,O,O,O,X,X,X,X,X,X,X,
        X,X,X,X,O,O,X,O,O,X,X,X,X,X,X,X,
        X,X,X,X,X,O,X,X,O,X,X,X,X,X,X,X,
        X,X,X,X,X,O,O,X,O,O,X,X,X,X,X,X,
      ],
    }
  ]);
}


