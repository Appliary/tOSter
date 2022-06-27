import Styles from './Sidebar.module.css';

const Sidebar = (props: {children: any}) => {
  return (
    <div className={Styles.sidebar}>
      {props.children}
    </div>
  )
}

export default Sidebar;
