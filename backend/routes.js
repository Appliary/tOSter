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
  Get('/api/Admin/Reboot', 'Admin/Reboot.js'),
  Get('/api/Admin/Shutdown', 'Admin/Shutdown.js'),
  Get('/api/Admin/Upgrade', 'Admin/Upgrade.js'),
];

const Leds = [
  Get('/api/Leds', 'Leds/List.js'),
  Get('/api/Leds/:id/Identify', 'Leds/Identify.js'),
];

const Apps = [
  Get('/api/Apps/Simon/:action', 'Apps/Simon.js'),
  Get('/api/Apps/Rainbow/:action', 'Apps/Rainbow.js'),
];

const Fallbacks = [
  Any('/api/*', 'NotFound.js'),
  Get('*', 'ServeFrontend.js'),
  Any('*', 'NotFound.js'),
];
