import {
  Get,
  Put,
  Post,
  Delete,
} from '#Utils/Api';

Get('/api/Faces', 'Faces/List');
Get('/api/Faces/count', 'Faces/count');
Get('/api/Faces/:id', 'WIP');
Post('/api/Faces', 'Faces/Add');
Put('/api/Faces/:id', 'WIP');
Delete('/api/Faces/:id', 'Faces/Remove');

Get('/api/Faces/:id/Play', 'Faces/Play');
