import { Document, EmbeddedDocument } from 'camo';

class Pixel extends EmbeddedDocument {
  constructor() {
    super();

    this.r = {
      type: Number,
      required: true,
      min: 0,
      max: 255,
      default: 0,
    };

    this.g = {
      type: Number,
      required: true,
      min: 0,
      max: 255,
      default: 0,
    };

    this.b = {
      type: Number,
      required: true,
      min: 0,
      max: 255,
      default: 0,
    };
  }
}

class Frame extends EmbeddedDocument {
  constructor() {
    super();

    this.bitmap = {
      type: [Pixel],
      required: true,
    };

    this.duration = {
      type: Number,
      min: 1,
    }
  }
}

export default class Face extends Document {
  constructor() {
    super();

    this.name = {
      type: String,
      required: true,
    };

    this.animation = {
      type: [Frame],
      required: true,
    }

    this.icon = {
      type: Frame,
      required: true,
    }

    this.pos = {
      type: Number,
      required: true,
      unique: true,
    }
  }
}
