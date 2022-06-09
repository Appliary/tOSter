import { Document } from 'camo';

import { Integer, ObjectProps } from '#Utils/Validate';
import { Init } from '#Utils/DB';

export default class Led extends Document {
  constructor() {
    super();

    this.address = {
      type: Number,
      unique: true,
      required: true,
      validate(addr) {
        Integer('address', addr);
        return true;
      }
    }

    this.position = {
      type: Object,
      unique: true,
      validate(pos) {
        ObjectProps('position', pos, [ 'x', 'y' ]);
        Integer('position.x', pos.x);
        Integer('position.y', pos.y);
        return true;
      }
    }
  }
}

Init(Led, {_id:'foo',address:0, position:{x:0, y:0}})
