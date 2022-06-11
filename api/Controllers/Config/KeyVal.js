import Config from '#Models/Config';

export async function GetConfig(req, res) {
  const data = await Config.findOne({
    _id: req.params.key
  });

  if (!data) {
    res.statusCode = 404;
    res.end('Not found');
  }

  res.json(data.value);
}

export async function SetConfig(req, res) {
  try {
    await Config.update({
      _id: req.params.key,
    }, {
      value: req.body
    });
  } catch (e) {
    res.statusCode = 400;
    res.end(e);
  }
}
