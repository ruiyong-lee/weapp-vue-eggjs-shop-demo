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
    const { uuid, orgUuid, version } = goods;
    const result = await Goods.update(goods, { where: { uuid, orgUuid, version: version - 1 } });

    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 上架商品
   * @param {string} uuid - 商品uuid
   * @param {string} orgUuid - 组织uuid
   * @param {object} modifyInfo - 商品修改信息
   * @return {string} - 商品uuid
   */
  Goods.up = async (uuid, orgUuid, modifyInfo = {}) => {
    const result = await Goods.update({ ...modifyInfo, status: 'up' }, {
      where: { uuid, orgUuid, version: modifyInfo.version - 1 },
    });

    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 下架商品
   * @param {string} uuid - 商品uuid
   * @param {string} orgUuid - 组织uuid
   * @param {object} modifyInfo - 商品修改信息
   * @return {string} - 商品uuid
   */
  Goods.down = async (uuid, orgUuid, modifyInfo = {}) => {
    const result = await Goods.update({ ...modifyInfo, status: 'down' }, {
      where: { uuid, orgUuid, version: modifyInfo.version - 1 },
    });

    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 查询key为类别的商品数据
   * @param {object} { categoryAttributes, orgUuid, goodsAttributes } - 条件
   * @return {object|null} - 查找结果
   */
  Goods.getGoodsWithCategory = async ({ categoryAttributes, orgUuid, goodsAttributes }) => {
    return await Goodscategory.findAll({
      attributes: categoryAttributes,
      where: { orgUuid },
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
   * @param {object} { orgUuid, attributes, pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  Goods.query = async ({ orgUuid, attributes, pagination = {}, filter = {}, sort = [] }) => {
    const { page, pageSize: limit } = pagination;
    const { keywordsLike, categoryUuid, status } = filter;
    const order = app.getSortInfo(sort);
    const condition = {
      offset: (page - 1) * limit,
      limit,
      order,
      attributes,
      where: { orgUuid },
    };

    if (categoryUuid) {
      condition.where.categoryUuid = categoryUuid;
    }

    if (status) {
      condition.where.status = status;
    }

    if (keywordsLike) {
      condition.where.name = { $like: `%%${keywordsLike}%%` };
    }

    const { count, rows } = await Goods.findAndCountAll(condition);

    return { page, count, rows };
  };

  /**
   * 查询商品
   * @param {object} { uuid, orgUuid } - 条件
   * @return {object|null} - 查找结果
   */
  Goods.get = async ({ uuid, orgUuid }) => {
    return await Goods.findOne({
      where: { uuid, orgUuid },
    });
  };

  return Goods;
};

