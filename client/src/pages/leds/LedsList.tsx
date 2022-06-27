import { Trans } from "react-i18next";
import { Component } from "react";
import Axios from "axios";

import ListItem from "../../components/ListItem";
import Scrollable from "../../components/Scrollable";
import Topnav, { Button } from "../../components/Topnav";
import Sidebar from "../../components/Sidebar";

export default class FacesList extends Component {
  state : any = {
    leds: [],
    bitmap: []
  };

  render() {
    return (
      <div>
        <Topnav>
          <Button to="/settings">
            <img src="/icons/left.png" alt="" />
            <Trans>Back</Trans>
          </Button>
        </Topnav>
        <Sidebar>
          <Scrollable>
            {
              this.state
                .leds
                .sort((a: any, b: any)=> a.address > b.address ? 1 : -1)
                .map((face: any) => (
                  <ListItem>
                    Led
                  </ListItem>
                ))
            }
          </Scrollable>
          <Scrollable>
            <table>
              {
                this.state.bitmap.map((row:any) => (
                  <tr>
                    {
                      row.map((px:any) => (
                        <td>-</td>
                      ))
                    }
                  </tr>
                ))
              }
            </table>
          </Scrollable>
        </Sidebar>
      </div>
    );
  }

  async loadLeds() {
    const { data: leds } = await Axios.get('/api/Leds');

    const bitmap:any[] = [];
    leds.forEach((led: any) => {
      if (!bitmap[led.pos.y]) bitmap[led.pos.y] = [];
      bitmap[led.pos.y][led.pos.x] = led;
    });

    this.setState({ leds, bitmap });
  }
}
