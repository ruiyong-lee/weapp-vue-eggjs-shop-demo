'use strict';

const { Controller } = require('egg');

class noticeController extends Controller {
  /**
   * 连接
   */
  async ping() {
    // const { ctx } = this;
    // const message = ctx.args[0];
    // await ctx.socket.emit('notice', `Hi! I've got your message: ${message}`);
  }
}

module.exports = noticeController;
