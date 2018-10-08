'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const goodsCategorySchema = require('../schema/goodscategory.js')(app);
  const GoodsCategory = db.defineModel(app, 'goodscategory', goodsCategorySchema);

  /**
   * 新增类别
   * @param {Object} goodsCategory 条件
   * @return {String} 类别uuid
   */
  GoodsCategory.saveNew = async goodsCategory => {
    await GoodsCategory.create(goodsCategory);
    return goodsCategory.uuid;
  };

  /**
   * 修改类别
   * @param {Object} goodsCategory 条件
   * @return {String} 类别uuid
   */
  GoodsCategory.saveModify = async goodsCategory => {
    const { uuid, name, version } = goodsCategory;
    const result = await GoodsCategory.update({ version, name }, { where: { uuid, version: version - 1 } });

    app.checkUpdate(result);

    return uuid;
  };

  /**
   * 删除类别
   * @param {Object} uuid 类别uuid
   * @return {String|Null} 删除类别uuid
   */
  GoodsCategory.delete = async uuid => {
    const result = await GoodsCategory.destroy({ where: { uuid } });

    app.checkDelete(result);

    return uuid;
  };

  /**
   * 查询类别分页列表
   * @param {Object} { attributes, pagination, filter } 条件
   * @return {Object|Null} 查找结果
   */
  GoodsCategory.query = async ({ userUuid, attributes, pagination = {}, filter = {} }) => {
    const { page, pageSize: limit } = pagination;
    const { count, rows } = await GoodsCategory.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      attributes,
      where: { ...filter, orgUuid: userUuid },
      order: [['createdTime', 'DESC']],
    });

    return { page, count, rows };
  };

  /**
   * 根据uuid获取类别
   * @param {Object} { pagination, filter } 条件
   * @return {Object|Null} 查找结果
   */
  GoodsCategory.get = async ({ uuid, attributes }) => {
    const goodsCategory = await GoodsCategory.findById(uuid, {
      attributes,
    });

    return goodsCategory;
  };

  return GoodsCategory;
};

