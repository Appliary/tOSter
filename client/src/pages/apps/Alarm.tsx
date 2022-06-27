import { Trans } from 'react-i18next';

import Topnav from '../../components/Topnav';
import Scrollable from '../../components/Scrollable';
import ListItem from '../../components/ListItem';
import ListSpacer from '../../components/ListSpacer';

import Styles from '../Menu.module.css';

const AlarmMenu = () => {
  return <div className={Styles.menu}>
    <Topnav active="clock" />
    <Scrollable>
      <ListSpacer />
      <ListItem icon="plus"><Trans>Set alarm</Trans>👷</ListItem>
    </Scrollable>
  </div>;
};

export default AlarmMenu;
