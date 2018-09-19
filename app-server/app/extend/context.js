'use strict';

module.exports = {
  // 获取token
  getAccessToken() {
    return this.cookies.get('token', { signed: false });
  },
  // 设置token
  setToken(data) {
    const { app } = this;
    const token = app.jwt.sign(data, app.config.jwt.secret, { expiresIn: '24h' });
    const cookieConfig = { maxAge: 1000 * 3600 * 24, httpOnly: false, overwrite: true, signed: false };

    this.cookies.set('token', token, cookieConfig);
    this.cookies.set('userUuid', data.userUuid, cookieConfig);
    this.cookies.set('userName', data.userName, cookieConfig);
  },
  // 校验token
  async verifyToken() {
    const { app } = this;
    const userUuid = this.cookies.get('userUuid', { signed: false });
    const userName = this.cookies.get('userName', { signed: false });
    const token = this.getAccessToken(this);
    const verifyResult = await new Promise(resolve => {
      app.jwt.verify(token, app.config.jwt.secret, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            this.setToken({ userUuid, userName }); // 刷新token
          } else {
            resolve({ verify: false, message: err.message });
          }
        } else {
          resolve({ verify: true, message: decoded });
        }
      });
    });

    if (!verifyResult.verify) {
      this.verifyFail(401, verifyResult.message);
      return false;
    }
    if (userUuid !== verifyResult.message.userUuid) {
      this.verifyFail(401, '用户 UUID 与 Token 不一致');
      return false;
    }

    this.request.body.userUuid = userUuid;
    this.request.body.userName = userName;
    return true;
  },
  // 校验token失败
  verifyFail(errorCode, message) {
    this.body = { errorCode, message };
    this.status = errorCode;
  },
};
