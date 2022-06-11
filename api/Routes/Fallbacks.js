import {
  Get,
  Any
} from '#Utils/Api';

// Unknown api
Any('/api/*', 'NotFound');

// Serve frontend
Get('/*', 'ServeClient');

// Finally, not found
Any('/*', 'NotFound');
