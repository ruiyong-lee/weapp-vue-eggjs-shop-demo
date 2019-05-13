# weapp-vue-eggjs-shop-demo

**适用于日用品、干货等商城，pc管理端 + 微信小程序 + 后端服务**

**您的 `星星` :star::star: 和 `建议` :facepunch::facepunch: 是我的动力 :kissing_heart::kissing_heart::kissing_heart:**

## 技术栈

微信小程序：**ES5 （小程序的代码写法有点旧，之后有时间重构）**

pc前端：**vue2 + vuex + vue-router + vue-cli3 + element-ui + ES6**

后端：**node + egg.js + ES6**

**暂时不做仓储功能，此项目的初衷并不想做成一个通用的软件，而是学习和交流，所以不做太多复杂的业务逻辑，更多的是技术上的拓展，项目在完整功能实现之前可能会有很大调整，fork的伙伴敬请谅解，完成之后会整理版本**

## 已完成（界面和接口）

> **小程序**

✔ 登录&nbsp;&nbsp;&nbsp;&nbsp;
✔ 首页获取类别和商品列表&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取商家运费方案&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取收货时间列表&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取用户订单分页列表&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取订单详情&nbsp;&nbsp;&nbsp;&nbsp;
✔ 创建订单&nbsp;&nbsp;&nbsp;&nbsp;
✔ 取消订单&nbsp;&nbsp;&nbsp;&nbsp;
✔ 自动取消订单&nbsp;&nbsp;&nbsp;&nbsp;
✘ 完成订单&nbsp;&nbsp;&nbsp;&nbsp;
✘ 预支付&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取用户地址列表&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取用户默认地址&nbsp;&nbsp;&nbsp;&nbsp;
✔ 设置用户默认地址&nbsp;&nbsp;&nbsp;&nbsp;
✔ 删除用户选中地址&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取用户指定地址&nbsp;&nbsp;&nbsp;&nbsp;
✔ 新增用户地址&nbsp;&nbsp;&nbsp;&nbsp;
✔ 编辑用户地址&nbsp;&nbsp;&nbsp;&nbsp;

> **pc管理端**

###### 管理员

✔ 登录&nbsp;&nbsp;&nbsp;&nbsp;
✔ 注销&nbsp;&nbsp;&nbsp;&nbsp;
✔ 修改密码&nbsp;&nbsp;&nbsp;&nbsp;
✔ 新增商家&nbsp;&nbsp;&nbsp;&nbsp;
✔ 编辑商家&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取商家&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取商家分页列表&nbsp;&nbsp;&nbsp;&nbsp;

###### 商家

✔ 登录&nbsp;&nbsp;&nbsp;&nbsp;
✔ 注销&nbsp;&nbsp;&nbsp;&nbsp;
✔ 修改密码&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取账号信息&nbsp;&nbsp;&nbsp;&nbsp;
✔ 编辑账号信息&nbsp;&nbsp;&nbsp;&nbsp;
✔ 新增商品类别&nbsp;&nbsp;&nbsp;&nbsp;
✔ 编辑商品类别&nbsp;&nbsp;&nbsp;&nbsp;
✔ 删除商品类别&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取商品类别分页列表&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取商品类别下拉列表&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取商品类别&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取商品分页列表&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取商品&nbsp;&nbsp;&nbsp;&nbsp;
✔ 新增商品&nbsp;&nbsp;&nbsp;&nbsp;
✔ 编辑商品&nbsp;&nbsp;&nbsp;&nbsp;
✔ 上架商品&nbsp;&nbsp;&nbsp;&nbsp;
✔ 下架商品&nbsp;&nbsp;&nbsp;&nbsp;
✔ 新增运费方案&nbsp;&nbsp;&nbsp;&nbsp;
✔ 编辑运费方案&nbsp;&nbsp;&nbsp;&nbsp;
✔ 删除运费方案&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取运费方案分页列表&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取运费方案&nbsp;&nbsp;&nbsp;&nbsp;
✔ 新增送货时间&nbsp;&nbsp;&nbsp;&nbsp;
✔ 编辑送货时间&nbsp;&nbsp;&nbsp;&nbsp;
✔ 删除送货时间&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取送货时间分页列表&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取送货时间&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取订货单分页列表&nbsp;&nbsp;&nbsp;&nbsp;
✔ 完成订货单&nbsp;&nbsp;&nbsp;&nbsp;
✔ 配送订货单&nbsp;&nbsp;&nbsp;&nbsp;
✔ 获取订货单&nbsp;&nbsp;&nbsp;&nbsp;

> **功能**

✔ 订单过期自动取消&nbsp;&nbsp;&nbsp;&nbsp;
✔ 多tab操作&nbsp;&nbsp;&nbsp;&nbsp;
✔ 记录接口调用，切换tab判断是否获取最新数据&nbsp;&nbsp;&nbsp;&nbsp;
✔ 表格条件查询&nbsp;&nbsp;&nbsp;&nbsp;
✔ 表格排序&nbsp;&nbsp;&nbsp;&nbsp;

## 计划

1、订单消息推送

2、首页日统计

3、小程序重构

to be continued...


## 开发与部署文档
- [app-server](https://github.com/ruiyong-lee/weapp-vue-eggjs-shop-demo/blob/master/app-server/README.md)
- [app-pc](https://github.com/ruiyong-lee/weapp-vue-eggjs-shop-demo/blob/master/app-pc/README.md)
- [app-wechat](https://github.com/ruiyong-lee/weapp-vue-eggjs-shop-demo/blob/master/app-wechat/README.md)

## 界面截图
```
补充中...
```

## 目录结构

```
.
├── app-wechat        // 小程序目录（已完成）
├── app-pc     // 小程序pc管理端目录（开发中）
├── app-server // 小程序服务端目录（开发中）
└── README.md
```

***

## 非常感谢以下开源项目或作者：

[**vuejs**](https://github.com/vuejs) |
[**axios**](https://github.com/axios/axios) |
[**ElemeFE**](https://github.com/ElemeFE) |
[**vue-cookie**](https://github.com/alfhen/vue-cookie) |
[**vue-svg-icon**](https://github.com/cenkai88/vue-svg-icon) |
[**vue2-transitions**](https://github.com/BinarCode/vue2-transitions) |
[**nodejs**](https://github.com/nodejs) |
[**egg**](https://github.com/eggjs/egg) |
[**ESLint**](https://github.com/eslint) |
[**mysql**](https://github.com/mysqljs/mysql) |
[**sequelize**](https://github.com/sequelize/sequelize) |
[**lodash**](https://github.com/lodash/lodash) |
[**fecha**](https://github.com/taylorhakes/fecha) |
[**node-uuid**](https://github.com/kelektiv/node-uuid) |
[**vuescroll**](https://github.com/YvesCoding/vuescroll) |
[**weui-wxss**](https://github.com/Tencent/weui-wxss) |
[**zanui-weapp**](https://github.com/youzan/zanui-weapp)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, ruiyong-lee
