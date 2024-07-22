const { version } = require('../../package.json');
const config = require('../config/config');

let hostName = 'localhost';

if (typeof window !== 'undefined') {
  hostName = window.location.hostname;
}

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Healmefit-APIs',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://${hostName}:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
