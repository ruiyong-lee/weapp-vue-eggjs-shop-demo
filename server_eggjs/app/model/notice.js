'use strict';

module.exports = app => {
  const { Sequelize, model, getSortInfo, checkUpdate } = app;
  const { Op } = Sequelize;
  const noticeSchema = require('../schema/notice.js')(app);
  const Notice = model.define('notice', noticeSchema);

  /**
   * 新增消息
   * @param {object} notice - 条件
   * @return {string} - 消息uuid
   */
  Notice.saveNew = async notice => {
    return await Notice.create(notice);
  };

  /**
   * 全部标记为已读
   * @return {object|null} - 操作结果
   */
  Notice.readAll = async ({ orgUuid }) => {
    const result = await Notice.update(
      { isRead: true },
      { where: { orgUuid, isRead: false } }
    );

    checkUpdate(result);

    return result;
  };

  /**
   * 获取消息概况（最多5条）
   * @param {object} { orgUuid } - 条件
   * @return {object|null} - 查找结果
   */
  Notice.overview = async ({ orgUuid }) => {
    const { count, rows } = await Notice.findAndCountAll({
      offset: 0,
      limit: 5,
      order: getSortInfo(),
      where: { orgUuid, isRead: false },
    });

    return { count, rows };
  };

  /**
   * 获取消息分页列表
   * @param {object} { orgUuid, attributes, pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  Notice.query = async ({ orgUuid, attributes, pagination = {}, filter = {}, sort = [] }) => {
    const { page, pageSize: limit } = pagination;
    const { keywordsLike } = filter;
    const order = getSortInfo(sort);
    const condition = {
      offset: (page - 1) * limit,
      limit,
      order,
      attributes,
      where: { orgUuid },
    };

    if (keywordsLike) {
      condition.where.name = { [Op.like]: `%%${keywordsLike}%%` };
    }

    const transaction = await app.transaction();
    const unread = await Notice.count({ where: { orgUuid, isRead: false }, transaction });
    const { count, rows } = await Notice.findAndCountAll({ ...condition, transaction });

    return { page, count, unread, rows };
  };

  return Notice;
};

