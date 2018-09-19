'use strict';

const Service = require('egg').Service;

/**
 * Service - 用户
 * @class
 * @author ruiyong-lee
 */
class UserService extends Service {
  /**
   * 查找一个商家数据
   * @param {String} uuid 商家uuid
   * @return {Object|null} 查找结果
   */
  async getMerchant(uuid) {
    const merchant = await this.app.mysql.get('merchant', { uuid });
    return merchant;
  }

  /**
   * 生成token
   * @param {Object} data 商家uuid
   * @return {String} token
   */
  createToken(data) {
    const { app } = this;
    return app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: '24h',
    });
  }

  /**
   * 验证token的合法性
   * @param {String} token token
   * @return {Object|null} 验证结果
   */
  verifyToken(token) {
    const { app } = this;
    return new Promise(resolve => {
      app.jwt.verify(token, app.config.jwt.secret, (err, decoded) => {
        if (err) {
          resolve({ verify: false, message: err.message });
        } else {
          resolve({ verify: true, message: decoded });
        }
      });
    });
  }
}

module.exports = UserService;
