import { Trans } from 'react-i18next';

import Topnav, { Button } from '../components/Topnav';
import Scrollable from '../components/Scrollable';

import Styles from './Menu.module.css';

const About = () => {
  return <div className={Styles.menu}>
    <Topnav>
      <Button to="/settings">
        <img src="/icons/left.png" alt="" />
        <Trans>Back</Trans>
      </Button>
    </Topnav>
    <Scrollable>
      <div style={{textAlign: 'center', margin: 25}}>
        <img style={{width: '80%', maxWidth: 400, margin: 'auto'}} src="/logo.png" alt="tOSter" />
        <p>This project is intended to provide an highly customizable hardware/software to build your protogen.</p>
        <p>Initiated by <strong>Mister Fawx</strong> with the help of <strong>Chiby Kitsune</strong> for testing and designs.</p>
      </div>
    </Scrollable>
  </div>;

};

export default About;
