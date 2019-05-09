# app-wechat

## 概述

本文档只介绍 **windows** 环境下如何本地调试和打包，关于小程序的介绍如需进一步了解，参见 [小程序文档][weapp]。

**此小程序代码有点旧，没有实际参考意义，后期会用wepy进行重构**

##### 开发环境、工具

- **微信Web开发者工具**

## 本地开发（windows）

1、打开微信Web开发者工具，新增小程序 -> 导入项目，选择文件夹`app-wechat`,
小程序的appId需要根据个人申请的小程序进行修改，默认是我自己的小程序

## 业务操作
因为这个小程序是之前公司项目直接拿过来用的，当时的业务需求就是这个小程序直接绑定一个商家，也就是一个商家对应一个小程序，所以是这样操作的：

1、把数据库里面要关联的商家uuid复制到小程序代码里面写死，打开 `app-wechat -> utils -> constans.js`，找到字段：MERCHANT_UUID, 替换商家uuid。

补充中...

[weapp]: https://developers.weixin.qq.com/miniprogram/dev/index.html?t=19041716
