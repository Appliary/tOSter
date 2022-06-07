import { Link } from "react-router-dom";
import { Trans } from 'react-i18next';

const NotFound = () => {
  return (
    <div style={{textAlign: 'center', fontFamily: 'monospace'}}>
      <h1>0~0</h1>
      <h3><Trans>Error404</Trans></h3>
      <Link to="/" style={{textDecoration: 'underline'}}><Trans>Back</Trans></Link>
    </div>
  );
};

export default NotFound;
