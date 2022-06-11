import { Trans } from "react-i18next";
import ListItem from "../../components/ListItem";
import Scrollable from "../../components/Scrollable";
import Topnav, { Button } from "../../components/Topnav";

const FacesList = () => {
  return (
    <div>
      <Topnav>
        <Button to="/settings">
          <img src="/icons/left.png" alt="" />
          <Trans>Back</Trans>
        </Button>
      </Topnav>
      <Scrollable>
        <ListItem sub={<Actions first />}>
          <img src="/dummyFace.png" alt="" height="20" />
          UwU face
        </ListItem>
        <ListItem sub={<Actions />}>
          <img src="/dummyFace.png" alt="" height="20" />
          OwO face
        </ListItem>
        <ListItem sub={<Actions />}>
          <img src="/dummyFace.png" alt="" height="20" />
          404 Not found
        </ListItem>
        <ListItem sub={<Actions last />}>
          <img src="/dummyFace.png" alt="" height="20" />
          418 I'm a toaster
        </ListItem>
      </Scrollable>
    </div>
  );
};

const Actions = (props: any) => {
  return (
    <div>
      <img src="/icons/down.png" alt="" height="20" style={{opacity: props.last?0:1, marginRight:8}} />
      <img src="/icons/up.png" alt="" height="20" style={{opacity: props.first?0:1, marginRight:8}} />
      <img src="/icons/delete.png" alt="" height="20" />
    </div>
  );
}

export default FacesList;
