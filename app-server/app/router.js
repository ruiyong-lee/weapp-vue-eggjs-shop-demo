'use strict';

/**
 * 路由
 * @param {Egg.Application} app 当前应用的实例
 * @author ruiyong-lee
 */
module.exports = app => {
  const { router, controller } = app;
  const { weapp } = controller;

  router.post('/weapp/goods/getGoods', weapp.getGoods);
  router.post('/weapp/order/queryOrderBill', weapp.queryOrderBill);
  router.post('/weapp/order/getOrderBill', weapp.getOrderBill);
  router.post('/weapp/user/customer/address/getDefaultAddress', weapp.getDefaultAddress);
  router.post('/weapp/login', weapp.login);
};
