#!/usr/bin/env node
process.env = {
  "NODE_PATH": "./api",
  "NODE_ENV": "production",
  "APIPORT": 3030
};

if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}
require('../server.babel'); // babel registration (runtime transpilation for node)
require('../api/api');
