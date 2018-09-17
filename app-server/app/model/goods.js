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
   * 查找所有商品数据
   * @param {Object} { categoryAttributes, merchantUuid, goodsAttributes } 条件
   * @return {Object|Null} 查找结果
   */
  Goods.getGoods = async ({ categoryAttributes, merchantUuid, goodsAttributes }) => {
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

