# mobile_uni-app

## 概述

本文档只介绍 **windows** 环境下如何本地调试和打包，关于小程序的介绍如需进一步了解，参见 [uniapp文档][uniapp] 、[微信小程序文档][weapp]。

##### 开发环境、工具

- **Node.js：** v12.13.1
- **Westorm：** v2019.3
- **微信Web开发者工具**

## 本地开发（windows）

1、安装Node.js（自带npm）：[Node.js安装配置](https://www.runoob.com/nodejs/nodejs-install-setup.html)

2、打开命令提示符，定位到文件夹`mobile_uni-app`

> 执行下面的命令，安装依赖和插件
```bash
npm i
```

> 执行下面的命令，启动本地服务
```bash
npm run dev:mp-weixin
```
打开微信Web开发者工具，新增小程序 -> 导入项目，选择文件夹`mobile_uni-app`,
小程序的appId需要根据个人申请的小程序进行修改，默认是我自己的小程序

## 打包部署
1、打开命令提示符，定位到文件夹`pc_vue`

> 执行下面的命令，打包项目
```bash
npm run build:mp-weixin
```
将主目录下的project.config.json中的miniprogramRoot修改为`dist/build/mp-weixin/`，打开微信Web开发者工具，选着刚才导入的
项目，就会定位到打包完的目录，而不是开发目录了

## 业务操作
因为这个小程序是之前公司项目直接拿过来用的，当时的业务需求就是这个小程序直接绑定一个商家，也就是一个商家对应一个小程序，所以是这样操作的（后期考虑做微信第三方开放平台）：

1、把数据库里面要关联的商家uuid复制到小程序代码里面写死，打开 `mobile_uni-app -> src -> common -> constans.js`，找到字段：MERCHANT_UUID, 替换商家uuid。

补充中...

[weapp]: https://developers.weixin.qq.com/miniprogram/dev/index.html?t=19041716
[uniapp]: https://uniapp.dcloud.io/
