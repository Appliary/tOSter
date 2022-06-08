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
Get('/api/Leds/:id/Identify', 'Leds/Identify');
