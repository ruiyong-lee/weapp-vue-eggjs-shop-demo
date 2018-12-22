'use strict';

/**
 * 路由
 * @param {Egg.Application} app - 当前应用的实例
 * @author ruiyong-lee
 */
module.exports = app => {
  const { router, controller } = app;
  const { weapp, user, utils, goods, goodsCategory } = controller;

  /**
   * 微信小程序
   */

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

  /**
   * 管理端
   */

  router.post('/user/login', user.common.login);
  router.post('/user/logout', user.common.logout);
  router.post('/user/savePasswordModify', user.common.savePasswordModify);

  /**
   * 管理端-管理员
   */

  router.post('/user/merchant/saveNew', user.merchant.saveNew);
  router.post('/user/merchant/saveModify', user.merchant.saveModify);
  router.get('/user/merchant/query', user.merchant.query);
  router.get('/user/merchant/get', user.merchant.get);

  /**
   * 管理端-商家
   */

  // 商品
  router.post('/goods/saveNew', goods.saveNew);
  router.post('/goods/saveModify', goods.saveModify);
  // router.post('/goods/up', goods.up);
  // router.post('/goods/down', goods.down);
  router.get('/goods/query', goods.query);
  router.get('/goods/get', goods.get);

  // 商品类别
  router.post('/goodsCategory/saveNew', goodsCategory.saveNew);
  router.post('/goodsCategory/saveModify', goodsCategory.saveModify);
  router.post('/goodsCategory/delete', goodsCategory.delete);
  router.get('/goodsCategory/query', goodsCategory.query);
  router.get('/goodsCategory/getDropdownList', goodsCategory.getDropdownList);
  router.get('/goodsCategory/get', goodsCategory.get);

  // utils
  router.post('/utils/upload', utils.upload.upload);
};
