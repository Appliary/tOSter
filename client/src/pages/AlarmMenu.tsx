import { Trans } from 'react-i18next';

import Topnav from '../components/Topnav';
import Scrollable from '../components/Scrollable';
import ListItem from '../components/ListItem';

import Styles from './settings/SettingsMenu.module.css';

const AlarmMenu = () => {
  return <div className={Styles.menu}>
    <Topnav active="clock" />
    <Scrollable>
      <ListItem sub="13:00"><Trans>Megafurs</Trans></ListItem>
      <ListItem><Trans>Add alarm</Trans></ListItem>
    </Scrollable>
  </div>;
};

export default AlarmMenu;
