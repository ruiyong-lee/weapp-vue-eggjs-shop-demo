'use strict';

const Controller = require('../../core/base_controller');
const path = require('path');
const fs = require('mz/fs');
const sendToWormhole = require('stream-wormhole');

/**
 * Controller - utils upload
 * @class
 * @author ruiyong-lee
 */
class UtilsUploadController extends Controller {
  /**
   * 测试上传
   */
  async upload() {
    const { app, ctx } = this;
    const parts = ctx.multipart();
    let part;
    let result;

    while ((part = await parts()) != null) {
      // part 是上传的文件流
      if (part.length) {
        // 这是 busboy 的字段
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          return this.fail(ctx.ERROR_CODE, '请选择文件');
        }

        // 文件处理，本地环境上传到本地磁盘，生产环境上传到云存储
        try {
          if (app.config.env === 'production') {
            // result = await ctx.oss.put('egg-multipart-test/' + part.filename, part);
          } else {
            const fileName = `local-upload-image-${ctx.helper.uuidv1()}.${part.mime.split('/')[1]}`;
            // 创建可写流
            const writerStream = fs.createWriteStream(path.join(this.config.baseDir, `app/public/upload/${fileName}`));

            // 目标写入流
            part.pipe(writerStream);
            result = `http://127.0.0.1:7001/public/upload/${fileName}`;
          }
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
      }
    }

    this.success(result);
  }
}

module.exports = UtilsUploadController;
