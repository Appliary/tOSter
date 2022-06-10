import {
  Get,
  Put,
  Post,
  Delete,
} from '#Utils/Api';

Get('/api/Leds', 'Leds/List');
Post('/api/Leds/:address', 'Leds/Add');
Put('/api/Leds/:address', 'Leds/Edit');
Delete('/api/Leds/:address', 'Leds/Remove');

Get('/api/Leds/:address/Identify', 'Leds/Identify');
