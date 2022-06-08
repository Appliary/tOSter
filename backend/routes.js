import {
  Get,
  Put,
  Post,
  Patch,
  Delete,
  Options,
  Any
} from './utils/Api.js';

const Admin = [
  Get('/api/Admin/Reboot', 'Admin/Reboot'),
  Get('/api/Admin/Shutdown', 'Admin/Shutdown'),
  Get('/api/Admin/Upgrade', 'Admin/Upgrade'),
];

const Apps = [
  Get('/api/Apps/Simon/:action', 'Apps/Simon'),
  Get('/api/Apps/Rainbow/:action', 'Apps/Rainbow'),
];

const Config = [
  Get('/api/Config/Wifi/scan', 'Config/Wifi', 'ScanWifi'),
];

const Leds = [
  Get('/api/Leds', 'Leds/List'),
  Get('/api/Leds/:id/Identify', 'Leds/Identify'),
];

const Fallbacks = [
  Any('/api/*', 'NotFound'),
  Get('*', 'ServeFrontend'),
  Any('*', 'NotFound'),
];
