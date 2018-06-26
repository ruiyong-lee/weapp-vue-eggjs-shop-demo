'use strict';
const defineGoodsModel = require('../schema/goods.js');
const defineGoodsCategoryModel = require('../schema/goodscategory.js');

module.exports = app => {
  const Goods = defineGoodsModel(app);
  const Goodscategory = defineGoodsCategoryModel(app);

  // 关系
  Goodscategory.hasMany(Goods, { foreignKey: 'categoryUuid' });

  /**
   * 查找所有商品数据
   * @param {object} params 条件
   * @return {object|null} 查找结果
   */
  Goods.getGoods = async params => {
    return await Goodscategory.findAll({
      attributes: params.categoryAttributes,
      where: { orgUuid: params.merchantUuid },
      include: [
        {
          model: Goods,
          attributes: params.goodsAttributes,
        },
      ],
    });
  };

  return Goods;
};

