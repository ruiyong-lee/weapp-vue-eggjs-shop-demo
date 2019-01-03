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
   * 新增商品
   * @param {object} goods - 条件
   * @return {string} - 类别uuid
   */
  Goods.saveNew = async goods => {
    const result = await Goods.create(goods);
    return result.uuid;
  };

  /**
   * 修改商品
   * @param {object} goods - 条件
   * @return {string} - 商品uuid
   */
  Goods.saveModify = async goods => {
    const { uuid, version } = goods;
    const result = await Goods.update(goods, { where: { uuid, version: version - 1 } });

    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 上架商品
   * @param {object} uuid - 商品uuid
   * @param {object} modifyInfo - 商品修改信息
   * @return {string} - 商品uuid
   */
  Goods.up = async (uuid, modifyInfo = {}) => {
    const result = await Goods.update({ ...modifyInfo, status: 'up' }, {
      where: {
        uuid,
        version: modifyInfo.version - 1,
      },
    });

    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 下架商品
   * @param {object} uuid - 商品uuid
   * @param {object} modifyInfo - 商品修改信息
   * @return {string} - 商品uuid
   */
  Goods.down = async (uuid, modifyInfo = {}) => {
    const result = await Goods.update({ ...modifyInfo, status: 'down' }, {
      where: {
        uuid,
        version: modifyInfo.version - 1,
      },
    });

    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 查询key为类别的商品数据
   * @param {object} { categoryAttributes, merchantUuid, goodsAttributes } - 条件
   * @return {object|null} - 查找结果
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
   * 查询某类别的商品数量
   * @param {string} categoryUuid - 类别uuid
   * @return {number|null} - 商品数量
   */
  Goods.countGoodsByCategory = async categoryUuid => {
    return await Goods.count({
      where: { categoryUuid },
    });
  };

  /**
   * 查询商品分页列表
   * @param {object} { attributes, pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  Goods.query = async ({ userUuid, attributes, pagination = {}, filter = {} }) => {
    const { page, pageSize: limit } = pagination;
    const { count, rows } = await Goods.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      attributes,
      where: { ...filter, orgUuid: userUuid },
      order: [['createdTime', 'DESC']],
    });

    return { page, count, rows };
  };

  /**
   * 查询商品
   * @param {sting} uuid - 商品uuid
   * @return {object|null} - 查找结果
   */
  Goods.get = async uuid => {
    return await Goods.findById(uuid);
  };

  return Goods;
};

