import { Trans } from 'react-i18next';

import Topnav from '../components/Topnav';
import Scrollable from '../components/Scrollable';
import ListItem from '../components/ListItem';
import ListSpacer from '../components/ListSpacer';

import Styles from './Menu.module.css';

const AppsMenu = () => {
  return <div className={Styles.menu}>
    <Topnav active="apps" />
    <Scrollable>
      <ListItem to="/apps/simon" sub={<Trans>SimonSub</Trans>} icon="simon"><Trans>Simon</Trans></ListItem>
      <ListItem to="/apps/rainbow" sub={<Trans>RainbowSub</Trans>} icon="rainbow"><Trans>Rainbow</Trans></ListItem>
      <ListSpacer />
      <ListItem to="/apps/clear"sub={<Trans>ClearSub</Trans>} icon="eraser"><Trans>Clear</Trans></ListItem>
      <ListItem to="/apps/identify" sub={<Trans>IdentifySub</Trans>} icon="led"><Trans>Identify</Trans></ListItem>
    </Scrollable>
  </div>;
};

export default AppsMenu;
