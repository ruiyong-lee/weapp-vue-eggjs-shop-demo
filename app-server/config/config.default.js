'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1523515826308_192';

  // 小程序只能存storage，关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 数据库
  config.mysql = {
    client: {
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '209cfcfaf6',
      // 数据库名
      database: 'weapp-vue-eggjs-shop-demo',
    },
    // 所有数据库配置的默认值
    default: {},

    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'weapp-vue-eggjs-shop-demo',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: '209cfcfaf6',
    timezone: '+08:00',
  };

  // redis
  config.redis = {
    clients: {
      default: {
        host: 'localhost',
        port: '6379',
        password: 'ruiyong-lee',
        db: '0',
      },
      subscribe: {
        host: 'localhost',
        port: '6379',
        password: 'ruiyong-lee',
        db: '1',
      },
      session: {
        host: 'localhost',
        port: '6379',
        password: 'ruiyong-lee',
        db: '2',
      },
    },
    agent: true,
  };

  exports.sessionRedis = {
    name: 'session', // specific instance `session` as the session store
  };

  // jwt
  exports.jwt = {
    secret: '123456',
    // ignore: '/weapp',
  };

  // 中间件
  config.middleware = ['auth', 'errorHandler'];

  return config;
};
