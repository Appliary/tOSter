import { Trans } from 'react-i18next';

import Topnav from '../components/Topnav';
import Scrollable from '../components/Scrollable';
import ListItem from '../components/ListItem';

import Styles from './settings/SettingsMenu.module.css';

const AppsMenu = () => {
  return <div className={Styles.menu}>
    <Topnav active="apps" />
    <Scrollable>
      <ListItem><Trans>T-Rex game</Trans></ListItem>
      <ListItem><Trans>Snake</Trans></ListItem>
      <ListItem><Trans>Pac-man</Trans></ListItem>
      <ListItem><Trans>Simon</Trans></ListItem>
    </Scrollable>
  </div>;
};

export default AppsMenu;
