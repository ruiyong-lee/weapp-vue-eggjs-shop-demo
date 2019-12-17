# pc_vue

## 概述

本文档只介绍 **windows** 环境下如何本地调试和打包，关于vue的介绍如需进一步了解，参见 [vue官网][vue]。

##### 开发环境、工具

- **Node.js：** v12.13.1

- **Westorm：** v2019.3

## 本地开发（windows）

1、安装Node.js（自带npm）：[Node.js安装配置](https://www.runoob.com/nodejs/nodejs-install-setup.html)

2、打开命令提示符，执行下面的命令全局安装vue-cli3
```
npm install -g @vue/cli
```

3、然后可以使用下面的命令，对项目进行可视化管理（非必要）
```
vue ui
```

4、打开命令提示符，定位到文件夹`pc_vue`

> 执行下面的命令，安装依赖和插件
```bash
npm i
```

> 执行下面的命令，启动本地服务
```bash
npm run serve
```

## 打包部署
1、打开命令提示符，定位到文件夹`pc_vue`

> 执行下面的命令，打包项目
```bash
npm run build
```

## 业务操作
1、完成 [app-server](https://github.com/ruiyong-lee/weapp-vue-eggjs-shop-demo/blob/master/app-server/README.md) 的配置后，默认初始化了一个管理员账号：admin，密码：admin
使用此账号登录，账号类型选择“管理员”，登陆成功就可以新建商家了。
新建商家后退出登录，用刚才新建的商家信息登录，账号类型选择“商家”，登陆成功后界面右上角打开“账号信息”，填写小程序的appId和appSecret，保存。

补充中...

[vue]: https://cn.vuejs.org/
