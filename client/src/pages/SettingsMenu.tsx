import { Trans } from 'react-i18next';
import { Component } from 'react';
import Axios from 'axios';

import Topnav from '../components/Topnav';
import Scrollable from '../components/Scrollable';
import ListItem from '../components/ListItem';
import ListSpacer from '../components/ListSpacer';

import Styles from './Menu.module.css';

export default class SettingsMenu extends Component {
  state = {
    faces: "•••",
    leds: "•••",
    wifi: "•••",
    bt: "•••",
    ip: "•••",
    lang: <Trans>currentLang</Trans>,
    tz: "•••",
    version: "•••",
    update: "",
  }

  render() {
    return (
      <div className={Styles.menu}>
        <Topnav active="settings" />
        <Scrollable>
          <ListItem to="/faces"             icon='face'    sub={this.state.faces}  ><Trans>manageFaces</Trans>👷</ListItem>
          <ListItem to="/leds"              icon='led'     sub={this.state.leds}   ><Trans>manageLeds</Trans>👷</ListItem>
          <ListSpacer />
          <ListItem to="/settings/wifi"     icon='wifi'    sub={this.state.wifi}   ><Trans>wifi</Trans>👷</ListItem>
          <ListItem to="/settings/bt"       icon='bt'      sub={this.state.bt}     ><Trans>bluetooth</Trans>👷</ListItem>
          <ListItem to="/settings/remote"   icon='remote'  sub={this.state.ip}     ><Trans>remoteAccess</Trans>👷</ListItem>
          <ListSpacer />
          <ListItem to="/settings/lang"     icon='lang'    sub={this.state.lang}   ><Trans>language</Trans></ListItem>
          <ListItem to="/settings/tz"       icon='tz'      sub={this.state.tz}     ><Trans>timezone</Trans>👷</ListItem>
          <ListSpacer />
          <ListItem to="/about"             icon='paw'                             ><Trans>about</Trans></ListItem>
          <ListItem to="/settings/update"   icon='version' sub={this.state.version}><Trans>update</Trans></ListItem>
          <ListItem to="/settings/shutdown" icon='shutdown'                        ><Trans>shutdown</Trans></ListItem>
        </Scrollable>
      </div>
    );
  }

  async componentDidMount() {
    // Get current wifi
    Axios.get('/api/Config/Wifi/current')
      .then(({data: wifi}) => this.setState({ wifi }));

    // Get leds count
    Axios.get('/api/Leds/count')
      .then(({data: leds}) => this.setState({ leds }));

    // Get faces count
    Axios.get('/api/Faces/count')
      .then(({data: faces}) => this.setState({ faces }));

    // Get version
    Axios.get('/api/Admin/Versions/current')
    .then(({data: version}) => this.setState({ version }));
  }
}
