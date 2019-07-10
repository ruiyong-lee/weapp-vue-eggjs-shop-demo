'use strict';

const Service = require('egg').Service;

/**
 * Service - 消息通知
 * @class
 * @author ruiyong-lee
 */
class NoticeService extends Service {
  /**
   * 发送消息
   */
  async send(acticon, notice) {
    const { ctx, app } = this;
    const result = await app.model.Notice.saveNew(notice); // 持久化消息
    const msg = ctx.helper.parseSocketMsg(acticon, result); // 封装数据
    app.io.of('/').emit('notice', msg); // 向客户端发送
    return result;
  }

  /**
   * 全部标记为已读
   * @param {object} params - 条件
   * @return {object|null} - 操作结果
   */
  async readAll(params = {}) {
    const { app } = this;
    return await app.model.Notice.readAll(params);
  }

  /**
   * 获取消息概况（最多5条）
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async overview(params = {}) {
    const { app } = this;
    return await app.model.Notice.overview(params);
  }

  /**
   * 获取消息分页列表
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async query(params = {}) {
    const { app } = this;
    return await app.model.Notice.query(params);
  }
}

module.exports = NoticeService;
