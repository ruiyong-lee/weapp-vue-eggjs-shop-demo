/**
 * goods | 模型
 */
const db = require('../../utils/db')
const goodsModelSchema = './../../schema/goods'
const categoryModelSchema = './../../schema/goodscategory'
const WeChatShopDb = db.WeChatShop // 引入数据库

// 用sequelize的import方法引入表结构，实例化
const Goods = WeChatShopDb.import(goodsModelSchema)
const Category = WeChatShopDb.import(categoryModelSchema)

// 关系
Category.hasMany(Goods, {foreignKey: 'categoryUuid'})

module.exports = {

  /**
   * 查找所有商品数据
   * @param  无
   * @return {object|null} 查找结果
   */
  async getGoods (condition) {
    let result = await Category.findAll({
      attributes: condition.categoryAttributes,
      where: {orgUuid: condition.orgUuid},
      include: [{
        model: Goods,
        attributes: condition.goodsAttributes
      }]
    })
    return result || null
  }
}
