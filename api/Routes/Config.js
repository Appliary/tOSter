import {
  Get,
  Put,
  Post,
  Delete,
} from '#Utils/Api';

// Wifi stuff
Get('/api/Config/Wifi', 'Config/Wifi', 'ListWifi');
Post('/api/Config/Wifi', 'Config/Wifi', 'AddWifi');
Delete('/api/Config/Wifi/:ssid', 'Config/Wifi', 'RemoveWifi');
Get('/api/Config/Wifi/scan', 'Config/Wifi', 'ScanWifi');
Get('/api/Config/Wifi/current', 'Config/Wifi', 'CurrentWifi');

// Basic key/val configs
Get('/api/Config/:key', 'Config/KeyVal', 'GetConfig');
Put('/api/Config/:key', 'Config/KeyVal', 'SetConfig');
