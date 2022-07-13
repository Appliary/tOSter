import { Component } from 'react';
import Axios from 'axios';

import { Trans } from 'react-i18next';

import Topnav, { SettingsBtn } from '../../components/Topnav';
import Scrollable from '../../components/Scrollable';
import ListItem from '../../components/ListItem';

import Styles from '../Menu.module.css';

export default class SettingsMenu extends Component {
  state = {
    current: '',
    versions: [],
  }

  render() {
    return (
      <div className={Styles.menu}>
        <Topnav>
          <SettingsBtn />
          <h1><Trans>update</Trans></h1>
        </Topnav>
        <Scrollable>
          {
            this.state
              .versions
              .map((version: string) => (
                <ListItem icon={version===this.state.current ? "check" : null}>
                  { version }
                </ListItem>
              ))
          }
        </Scrollable>
      </div>
    );
  }

  async componentDidMount() {
    // Get current version
    Axios.get('/api/Admin/Versions/current')
    .then(({data: current}) => this.setState({ current }));
  }
}
