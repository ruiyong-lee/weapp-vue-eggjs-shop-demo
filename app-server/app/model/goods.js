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
   * @param {Object} params 条件
   * @return {Object|Null} 查找结果
   */
  Goods.getGoods = async params => {
    const { categoryAttributes, merchantUuid, goodsAttributes } = params;

    return await Goodscategory.findAll({
      attributes: categoryAttributes,
      where: { orgUuid: merchantUuid },
      include: [
        {
          model: Goods,
          attributes: goodsAttributes,
        },
      ],
    });
  };

  return Goods;
};

