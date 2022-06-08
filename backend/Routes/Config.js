import {
  Get,
  Put,
  Post,
  Patch,
  Delete,
  Options,
  Any
} from '#Utils/Api';

// Wifi stuff
Get('/api/Config/Wifi', 'Config/Wifi', 'ListWifi');
Post('/api/Config/Wifi', 'Config/Wifi', 'AddWifi');
Delete('/api/Config/Wifi/:ssid', 'Config/Wifi', 'RemoveWifi');
Get('/api/Config/Wifi/scan', 'Config/Wifi', 'ScanWifi');
