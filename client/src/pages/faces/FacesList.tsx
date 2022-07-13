import { Trans } from "react-i18next";
import { Component } from "react";
import Axios from "axios";

import ListItem from "../../components/ListItem";
import Scrollable from "../../components/Scrollable";
import Topnav, { SettingsBtn } from "../../components/Topnav";

export default class FacesList extends Component {
  state : any = {
    faces: [],
  };

  render() {
    return (
      <div>
        <Topnav>
          <SettingsBtn />
          <h1><Trans>manageFaces</Trans></h1>
        </Topnav>
        <Scrollable>
          {
            this.state
              .faces
              .sort((a: any, b: any)=> a.pos > b.pos ? 1 : -1)
              .map((face: any) => (
                <ListItem sub={<Actions first={face.pos===0} />}>
                  <img src="/dummyFace.png" alt="" height="20" />
                  { face.name }
                </ListItem>
              ))
          }
        </Scrollable>
      </div>
    );
  }

  async componentDidMount() {
    const { data: faces } = await Axios.get('/api/Faces');
    this.setState({ faces });
  }
}

const Actions = (props: any) => {
  return (
    <div>
      <img src="/icons/down.png" alt="" height="20" style={{opacity: props.last?0:1, marginRight:8}} />
      <img src="/icons/up.png" alt="" height="20" style={{opacity: props.first?0:1, marginRight:8}} />
      <img src="/icons/delete.png" alt="" height="20" />
    </div>
  );
}
