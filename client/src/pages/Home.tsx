import Axios from 'axios';
import { Component } from 'react';

import Scrollable from '../components/Scrollable';
import Topnav from '../components/Topnav';
import FaceIcon from '../components/FaceIcon';

import Styles from './Home.module.css';

export default class Home extends Component {
  state: any = {
    faces: [],
  };

  render() {
    return (
      <div className={Styles.home}>
        <Topnav />
        <Scrollable>
          <div className={Styles.grid}>
            {
              this.state.faces.map((face: any) => (
                <div className={Styles.card}>
                  <FaceIcon icon={face.icon} width={100} />
                  <span>{ face.name }</span>
                </div>
              ))
            }
          </div>
        </Scrollable>
      </div>
    );
  }

  async componentDidMount() {
    const { data: faces } = await Axios.get('/api/Faces');
    this.setState({ faces });
  }
}
