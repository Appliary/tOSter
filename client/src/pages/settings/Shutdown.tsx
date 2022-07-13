import { Trans } from 'react-i18next';

import Topnav, { SettingsBtn } from '../../components/Topnav';

import Styles from '../Menu.module.css';

const SettingsShutdown = () => (
  <div className={Styles.unplug}>
    <Topnav>
      <SettingsBtn />
      <h1><Trans>Shutdown</Trans></h1>
    </Topnav>
    <h1>(un)PLUG ME DADDY</h1>
  </div>
);

export default SettingsShutdown;
