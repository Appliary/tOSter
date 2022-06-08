import Package from '../Utils/package.cjs';

export default function PoweredBy(req, res, next){
  res.set('X-Powered-By', `tOSter v${Package.version}`);
  next();
}
