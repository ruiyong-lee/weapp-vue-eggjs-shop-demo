'use strict';

const { Controller } = require('egg');

/**
 * BaseController
 * @class
 * @author ruiyong-lee
 */
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data, status) {
    this.ctx.body = { errorCode: 0, data };
    this.ctx.status = status || 200;
  }

  fail(errorCode, message) {
    this.ctx.body = { errorCode, message };
    this.ctx.status = 200;
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
