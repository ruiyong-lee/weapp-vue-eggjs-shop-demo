'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - user admin
 * @class
 * @author ruiyong-lee
 */
class UserAdminController extends Controller {
  /**
   * 新建商家
   */
  async create() {
    const { ctx, app } = this;
    this.success();
  }
}

module.exports = UserAdminController;
