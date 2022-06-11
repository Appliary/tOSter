import { Link } from 'react-router-dom';

import Styles from './ListItem.module.css';

const ListItem = (props: any) => {
  if (props.to) {
    return (
      <Link className={Styles.link} to={props.to}>
        <span>{props.children}</span>
        <span className={Styles.sub}>
          {props.sub}
          <img src="/icons/right.png" alt="" style={{height:12, marginLeft:5}} />
        </span>
      </Link>
    );
  }

  return (
    <div className={Styles.line}>
      <span>{props.children}</span>
      <span className={Styles.sub}>{props.sub}</span>
    </div>
  )
}

export default ListItem;
