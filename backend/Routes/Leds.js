import {
  Get,
  Put,
  Post,
  Patch,
  Delete,
  Options,
  Any
} from '#Utils/Api';

Get('/api/Leds', 'Leds/List');
Get('/api/Leds/:address/Identify', 'Leds/Identify');
Put('/api/Leds/:address', 'Leds/Add');
