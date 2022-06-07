import { Trans } from 'react-i18next';

import Topnav from '../../components/Topnav';
import Scrollable from '../../components/Scrollable';
import ListItem from '../../components/ListItem';

import Styles from './SettingsMenu.module.css';

const SettingsMenu = () => {
  return <div className={Styles.menu}>
    <Topnav active="settings" />
    <Scrollable>
      <ListItem sub="10 faces" to="/faces"><Trans>Manage faces</Trans></ListItem>
      <ListItem sub="6 zones"><Trans>Manage zones</Trans></ListItem>
      <ListItem sub="My wifi network"><Trans>Wi-fi connection</Trans></ListItem>
      <ListItem sub="127.0.0.1"><Trans>IP Address</Trans></ListItem>
      <ListItem sub="v22.04.23"><Trans>System version</Trans></ListItem>
      <ListItem sub="Europe/Brussels"><Trans>Timezone</Trans></ListItem>
      <ListItem sub="English" to="/settings/lang"><Trans>Language</Trans></ListItem>
      <ListItem><Trans>Shut down</Trans></ListItem>
    </Scrollable>
  </div>;
};

export default SettingsMenu;
