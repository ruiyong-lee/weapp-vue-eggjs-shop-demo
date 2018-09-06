'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1523515826308_192';

  // 小程序只能存storage，关闭csrf
  config.security = {
    csrf: {
      ignore: '/weapp',
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
      database: 'weapp_eggjs_shop_demo',
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
    database: 'weapp_eggjs_shop_demo',
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
    },
    agent: true,
  };

  // 中间件
  config.middleware = ['auth', 'errorHandler'];

  return config;
};
