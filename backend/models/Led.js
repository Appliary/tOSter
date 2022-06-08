import { Document } from 'camo';

export default class Led extends Document {
  // constructor() {
  //   super();

  //   this.position = {
  //     type: Object,
  //     unique: true,
  //     validate(pos) {
  //       const unknownProps = Object.keys(pos).filter(key=>['x', 'y'].includes(key));
  //       if (unknownProps.length) {
  //         throw new Error(`Property "position.${unknownProps[0]}" not allowed.`);
  //       }

  //       if(!Number.isSafeInteger(pos.x)) {
  //         throw new Error('The "position.x" property should be an integer and is required.');
  //       }
  //       if(!Number.isSafeInteger(pos.y)) {
  //         throw new Error('The "position.y" property should be an integer and is required.');
  //       }
  //       return true;
  //     }
  //   }
  // }

  // async preSave() {
  //   if (!this._id) {
  //     const count = Led.count({});
  //     this._id = count.toString();
  //   }
  // }
}
