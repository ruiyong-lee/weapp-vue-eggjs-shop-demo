'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();

    // 初始化延迟任务
    app.initDelayTask();

    // 创建订单过期自动取消任务
    app.registerTaskHandler('cancelOrder', async uuid => {
      const goodsOrder = await ctx.service.goodsOrder.getByUuid(uuid);

      if (goodsOrder.status === 'initial') {
        await ctx.service.goodsOrder.cancel(goodsOrder.dataValues);
        console.log(`过期自动取消订单: uuid=${uuid}`);
      }
    });
  });
};
