# server_eggjs

## 概述

本文档只介绍 **windows** 环境下如何本地调试和（待定）环境下服务器部署，关于eggjs的介绍如需进一步了解，参见 [egg官网][egg]。

##### 开发环境、工具

- **Node.js：** v12.13.1 （>= v8.0.0）

- **Mysql：** v5.5.51

- **Redis：** v3.2.0  需要打开配置：notify-keyspace-events Ex

- **Redis配置：** notify-keyspace-events Ex

- **Westorm：** v2019.3

- **Webstorm配置：** File - Settings - Languages & Frameworks - Node.js and NPM 里面的 coding assistance for node.js 勾选 ，这样就会有代码提示

## 本地开发（windows）

1、安装Node.js：[Node.js安装配置](https://www.runoob.com/nodejs/nodejs-install-setup.html)

2、安装mysql： [mysql图文安装教程](https://www.cnblogs.com/whaben/articles/6687544.html) 

2、安装redis： [Redis安装](https://www.runoob.com/redis/redis-install.html) 

3、新建数据库，名称：`weapp-vue-eggjs-shop-demo`，配置默认写的是我本地数据库的名称和密码，如需要自行修改 `server_eggjs -> config -> config.default.js` 和 `server_eggjs -> database -> config.json` 里面的配置，然后在server_eggjs目录下运行 `npm run db:up`，就可以迁移数据库，初始化表和建了一个管理员账号。数据的迁移具体请看：[Sequelize](https://eggjs.org/zh-cn/tutorials/sequelize.html)

4、Redis配置：默认端口号，没有设置密码，如需要自行修改 `server_eggjs -> config -> config.default.js`，打开Redis安装目录下的配置文件`redis.windows.conf`，找到`notify-keyspace-events Ex`，取消注释，重启Redis

5、打开命令提示符，定位到文件夹`server_eggjs`

> 执行下面的命令，安装依赖
```bash
npm i
```

> 执行下面的命令，启动本地服务
```bash
npm run dev
```

> 执行下面的命令，启动本地调试（可断点）
```bash
npm run debug
```

## 部署

补充中...

```bash
$ npm start
$ npm stop
```

## 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

## 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org/zh-cn/index.html
