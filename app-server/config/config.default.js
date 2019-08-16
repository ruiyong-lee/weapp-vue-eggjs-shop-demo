'use strict';
const fecha = require('fecha');
const isNumber = require('lodash/isNumber');

module.exports = appInfo => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1523515826308_192',

    // 小程序只能存storage，关闭csrf
    security: {
      csrf: {
        enable: false,
      },
    },

    // 数据库
    mysql: {
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
    },

    // sequelize
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'weapp-vue-eggjs-shop-demo',
      host: '127.0.0.1',
      port: '3306',
      username: 'root',
      password: '209cfcfaf6',
      timezone: '+08:00',
      define: {
        createdAt: 'createdTime',
        updatedAt: 'lastModifiedTime',
        freezeTableName: true,
        underscored: false,
        getterMethods: {
          createdTime() {
            const createdTime = this.getDataValue('createdTime');
            if (createdTime) {
              return fecha.format(createdTime, 'YYYY-MM-DD HH:mm:ss');
            }
          },
          lastModifiedTime() {
            const lastModifiedTime = this.getDataValue('lastModifiedTime');
            if (lastModifiedTime) {
              return fecha.format(lastModifiedTime, 'YYYY-MM-DD HH:mm:ss');
            }
          },
        },
        setterMethods: {
          version(value) {
            if (isNumber(value)) {
              this.setDataValue('version', value + 1);
            }
          },
        },
      },
    },

    // socket.io
    io: {
      init: {}, // passed to engine.io
      namespace: {
        '/': {
          connectionMiddleware: [],
          packetMiddleware: [],
        },
      },
    },

    // redis
    redis: {
      clients: {
        default: {
          host: '127.0.0.1',
          port: '6379',
          password: '',
          db: '0',
        },
        subscribe: {
          host: '127.0.0.1',
          port: '6379',
          password: '',
          db: '1',
        },
        session: {
          host: '127.0.0.1',
          port: '6379',
          password: '',
          db: '2',
        },
      },
      agent: true,
    },

    sessionRedis: {
      name: 'session', // specific instance `session` as the session store
    },

    // jwt
    jwt: {
      secret: '123456',
      // ignore: '/weapp',
    },

    // 文件上传 File 模式
    // multipart: {
    //   mode: 'file',
    // },

    // 中间件
    middleware: ['auth', 'errorHandler'],
  };
};
