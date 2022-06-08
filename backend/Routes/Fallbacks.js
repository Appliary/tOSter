import {
  Get,
  Put,
  Post,
  Patch,
  Delete,
  Options,
  Any
} from '#Utils/Api';

// Unknown api
Any('/api/*', 'NotFound');

// Serve frontend
Get('*', 'ServeFrontend');

// Finally, not found
Any('*', 'NotFound');