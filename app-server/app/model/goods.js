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
   * @param {object} condition 条件
   * @return {object|null} 查找结果
   */
  Goods.getGoods = async condition => {
    return await Goodscategory.findAll({
      attributes: condition.categoryAttributes,
      where: { orgUuid: condition.orgUuid },
      include: [
        {
          model: Goods,
          attributes: condition.goodsAttributes,
        },
      ],
    });
  };

  return Goods;
};

