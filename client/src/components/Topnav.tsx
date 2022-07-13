import { Link } from "react-router-dom";
import { Trans } from 'react-i18next';

import Clock from "../components/Clock";

import Styles from './Topnav.module.css';
import Icon from "./Icon";

const Topnav = (props: any) => {
  if (!props.children) {
    return (
      <div className={Styles.topnav}>
        <Button to="/apps" active={props.active==='apps'}>
          <Trans>Applications</Trans>
        </Button>
        <Button to="/settings" active={props.active==='settings'}>
          <Trans>Settings</Trans>
        </Button>
        <Button to="/settings/fan" active={props.active==='fan'} right>
          <Icon name="fan" rotate/>
        </Button>
        <Button to="/settings/brightness" active={props.active==='brightness'}>
          <Icon name="brightness" />
        </Button>
        <Button to="/apps/alarms" active={props.active==='clock'}>
          <Clock />
        </Button>
      </div>
    );
  }

  return (
    <div className={Styles.topnav}>
      {props.children}
    </div>
  );
};

export const Button = (props: any) => {
  const to = props.active ? '/' : props.to;
  let className = props.active ? Styles.activeBtn : '';
  if(props.right) className += ' ' + Styles.rightBtn;

  return (
    <Link to={to} className={className}>
      {props.children}
    </Link>
  )
}

export const SettingsBtn = (props: any) => (
  <Button to="/settings">
    <Icon name="left" />
    <Trans>Settings</Trans>
  </Button>
);

export default Topnav;
