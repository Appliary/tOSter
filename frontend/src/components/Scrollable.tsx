import Styles from './Scrollable.module.css';

const Scrollable = (props: {children: any}) => {
  return (
    <div className={Styles.scrollable}>
      {props.children}
    </div>
  )
}

export default Scrollable;
