import Scrollable from '../components/Scrollable';
import Topnav from '../components/Topnav';

import Styles from './Home.module.css';

const Home = () => {
  return <div className={Styles.home}>
    <Topnav />
    <Scrollable>
      <div className={Styles.grid}>
        <img src="/dummyFace.png" alt="face" />
        <img src="/dummyFace.png" alt="face" />
        <img src="/dummyFace.png" alt="face" />
        <img src="/dummyFace.png" alt="face" />
        <img src="/dummyFace.png" alt="face" />
        <img src="/dummyFace.png" alt="face" />
        <img src="/dummyFace.png" alt="face" />
        <img src="/dummyFace.png" alt="face" />
        <img src="/dummyFace.png" alt="face" />
        <img src="/dummyFace.png" alt="face" />
      </div>
    </Scrollable>
  </div>;
};

export default Home;
