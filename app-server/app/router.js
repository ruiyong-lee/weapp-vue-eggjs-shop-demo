'use strict';

/**
 * 路由
 * @param {Egg.Application} app 当前应用的实例
 * @author ruiyong-lee
 */
module.exports = app => {
  const { router, controller } = app;
  const { weapp, user } = controller;

  // 微信小程序
  router.post('/weapp/getGoods', weapp.getGoods);
  router.post('/weapp/getDefaultFreightPlan', weapp.getDefaultFreightPlan);
  router.post('/weapp/getDeliveryTimeTypeList', weapp.getDeliveryTimeTypeList);
  router.post('/weapp/queryOrderBill', weapp.queryOrderBill);
  router.post('/weapp/getOrderBill', weapp.getOrderBill);
  router.post('/weapp/createBill', weapp.createBill);
  router.post('/weapp/cancelBill', weapp.cancelBill);
  router.post('/weapp/getAddress', weapp.getAddress);
  router.post('/weapp/getDefaultAddress', weapp.getDefaultAddress);
  router.post('/weapp/setDefaultAddress', weapp.setDefaultAddress);
  router.post('/weapp/deleteAddress', weapp.deleteAddress);
  router.post('/weapp/getAddressList', weapp.getAddressList);
  router.post('/weapp/saveNewAddress', weapp.saveNewAddress);
  router.post('/weapp/saveModifyAddress', weapp.saveModifyAddress);
  router.post('/weapp/login', weapp.login);

  // 管理端
  router.post('/user/login', user.common.login);
  router.post('/user/get', user.common.getUserInfo);
};
