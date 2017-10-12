# wechat-shop-demo 服务端开发笔记

> **作者：ruiyong-lee**

> **创建时间：2017-08-31**

> **版权声明：本文为 ruiyong-lee 原创文章，可以随意转载，但必须在明确位置注明出处**

## 简介

nodejs开发，希望小伙伴们帮忙指正错误和不足，多谢~

## 准备

看了一些教程和文章，选择了[Koa](http://koa.bootcss.com) -- 基于 Node.js 平台的下一代 web 开发框架（官网文档还是1.0的，
可以参考 [《Koa2进阶学习笔记》](https://github.com/ChenShenhai/koa2-note) ），
目前的最新版本是2.3.0。

##### 开发环境、工具

- **node.js：** v8.4.0 （>= v7.6.0）

- **mysql：** v5.5.51

- **westorm：** 2017.2.2

- **Webstorm配置：** File - Settings - Languages & Frameworks - Node.js and NPM 里面的Node.js Core library 设置成 enabled ，这样就会有代码提示

##### 项目中一些关键依赖

以下依赖的版本都是本文所写的时候的最新版本

- **Koa(v2.3.0)**
- **Koa-Bodyparser(v4.2.0)**
- **Koa-Router(v7.2.1)**
- **Mysql(v2.14.1)** // nodejs的mysql驱动
- **Sequelize(v3.29.0)** // 操作数据库的ORM(对象关系映射 Object Relational Mapping)
- **sequelize-auto(v0.4.28)** // 导出表结构
- **eslint(v4.6.1)** // 代码检测工具

##### 目录结构

```
.
├── doc // 开发文档目录
├── server // Koa后端代码目录
│   ├── controllers // 控制层目录
│   ├── models // model层目录
│   ├── routes // 路由目录
│   ├── schema // 数据库表结构目录
│   ├── services // 业务层目录
│   ├── utils // 工具目录
│   └── app.js // koa 入口文件
├── sql // 数据库初始化目录
│   ├── scripts // 数据库脚本目录
│   ├── util // 一些读取数据库脚本的工具目录
│   └── index.js // 初始化入口文件
├── config.js // 配置文件
├── .eslintrc.js // eslint配置文件
├── package.json // npm的依赖、项目信息文件
└── README.md
```

## 环境搭建

##### 安装依赖

##### MYSQL

[官网](https://dev.mysql.com/downloads/mysql/) 下载安装，安装过程可参考： [MySQL 5.7版本的安装使用详细教程](http://blog.csdn.net/hisense20112784/article/details/72909701)
可以安装一些可视化工具来辅助操作数据库，如：[Navicat](http://www.navicat.com.cn/products/navicat-for-mysql) (收费，但可以你懂的)、 [HeidiSQL](https://www.heidisql.com/) (免费)
安装完后，需要在本地新建一个数据库：wechat-shop-demo

未完待续......