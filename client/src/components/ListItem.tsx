import { Link } from 'react-router-dom';
import Icon from './Icon';

import Styles from './ListItem.module.css';

const ListItem = (props: any) => {
  if (props.to) {
    return (
      <Link className={Styles.link} to={props.to}>
        <span className={Styles.icon}>
          <Icon name={props.icon} />
        </span>
        <span>{props.children}</span>
        <span className={Styles.sub}>
          {props.sub}
          <img src="/icons/right.png" alt="" style={{height:12, marginLeft:5}} />
        </span>
      </Link>
    );
  }

  if (props.onClick) {
    return (
      <div className={Styles.link} onClick={props.onClick}>
        <span className={Styles.icon}>
          <Icon name={props.icon} />
        </span>
        <span>{props.children}</span>
        <span className={Styles.sub}>{props.sub}</span>
      </div>
    );
  }

  return (
    <div className={Styles.line}>
      <span className={Styles.icon}>
        <Icon name={props.icon} />
      </span>
      <span>{props.children}</span>
      <span className={Styles.sub}>{props.sub}</span>
    </div>
  )
}

export default ListItem;
