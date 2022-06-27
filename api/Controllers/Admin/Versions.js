import Package from "../../Utils/package.cjs";

export function Current(req, res) {
  res.json(Package.version);
}
