import { Trans } from 'react-i18next';

import Topnav, { Button } from '../../components/Topnav';
import Scrollable from '../../components/Scrollable';
import ListItem from '../../components/ListItem';

import Styles from './SettingsMenu.module.css';

const SettingsMenu = () => {
  return <div className={Styles.menu}>
    <Topnav>
      <Button to="/settings">
        <img src="/icons/left.png" alt="" />
        <Trans>Back</Trans>
      </Button>
    </Topnav>
    <Scrollable>
      <ListItem sub="✅">English</ListItem>
      <ListItem>Baguette</ListItem>
      <ListItem>日本語</ListItem>
    </Scrollable>
  </div>;
};

export default SettingsMenu;
