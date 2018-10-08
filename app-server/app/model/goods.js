'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const goodsSchema = require('../schema/goods.js')(app);
  const goodsCategorySchema = require('../schema/goodscategory.js')(app);
  const Goods = db.defineModel(app, 'goods', goodsSchema);
  const Goodscategory = db.defineModel(app, 'goodscategory', goodsCategorySchema, {
    timestamps: false,
    freezeTableName: true,
  });

  // 关系
  Goodscategory.hasMany(Goods, { foreignKey: 'categoryUuid' });

  /**
   * 获取key为类别的商品数据
   * @param {Object} { categoryAttributes, merchantUuid, goodsAttributes } 条件
   * @return {Object|Null} 查找结果
   */
  Goods.getGoodsWithCategory = async ({ categoryAttributes, merchantUuid, goodsAttributes }) => {
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

  /**
   * 获取某类别的商品数量
   * @param {String} categoryUuid 类别uuid
   * @return {Number|Null} 商品数量
   */
  Goods.countGoodsByCategory = async categoryUuid => {
    return await Goods.count({
      where: { categoryUuid },
    });
  };

  return Goods;
};

