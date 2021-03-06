import { Trans } from 'react-i18next';

import Topnav, { SettingsBtn } from '../../components/Topnav';
import Scrollable from '../../components/Scrollable';
import ListItem from '../../components/ListItem';

import { languages } from '../../localisation';

import Styles from '../Menu.module.css';

const SettingsMenu = () => {
  const current = window.localStorage.getItem('lang') || 'en';

  return <div className={Styles.menu}>
    <Topnav>
      <SettingsBtn />
      <h1><Trans>language</Trans></h1>
    </Topnav>
    <Scrollable>
      {
        languages.map(lang => (
          <ListItem icon={lang===current ? "check" : null} onClick={()=>setLang(lang)}><Trans>{lang}</Trans></ListItem>
        ))
      }
    </Scrollable>
  </div>;

};

function setLang(lang: string) {
  window.localStorage.setItem('lang', lang);
  window.location.reload();
}

export default SettingsMenu;
