'use strict';

// had enabled by egg
// exports.static = true;

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};
