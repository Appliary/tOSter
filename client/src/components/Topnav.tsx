import { Link } from "react-router-dom";
import { Trans } from 'react-i18next';

import Clock from "../components/Clock";

import Styles from './Topnav.module.css';

const Topnav = (props: any) => {
  if (!props.children) {
    return (
      <div className={Styles.topnav}>
        <Button to="/apps" active={props.active==='apps'}>
          <Trans>Games</Trans>
        </Button>
        <Button to="/settings" active={props.active==='settings'}>
          <Trans>Settings</Trans>
        </Button>
        <Button to="/alarms" active={props.active==='clock'} right>
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

export default Topnav;
