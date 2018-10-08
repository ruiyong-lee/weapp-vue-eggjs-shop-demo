'use strict';

/**
 * 路由
 * @param {Egg.Application} app 当前应用的实例
 * @author ruiyong-lee
 */
module.exports = app => {
  const { router, controller } = app;
  const { weapp, user, goodsCategory } = controller;

  // 微信小程序
  router.post('/weapp/getGoodsWithCategory', weapp.getGoodsWithCategory);
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
  router.post('/user/logout', user.common.logout);
  router.post('/user/savePasswordModify', user.common.savePasswordModify);

  // admin
  router.post('/user/merchant/saveNew', user.merchant.saveNew);
  router.post('/user/merchant/saveModify', user.merchant.saveModify);
  router.post('/user/merchant/query', user.merchant.query);
  router.post('/user/merchant/get', user.merchant.get);

  // merchant
  router.post('/goodsCategory/saveNew', goodsCategory.saveNew);
  router.post('/goodsCategory/saveModify', goodsCategory.saveModify);
  router.post('/goodsCategory/delete', goodsCategory.delete);
  router.post('/goodsCategory/query', goodsCategory.query);
  router.post('/goodsCategory/get', goodsCategory.get);
};
