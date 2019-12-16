// 混合
import isEmpty from 'lodash/isEmpty';

export default {
  methods: {
    // 再次购买，覆盖商品最新信息
    async orderAgain(lines) {
      uni.showModal({
        title: '提示',
        content: '将清空购物车，确认继续？',
        success: async (res) => {
          if (res.confirm) {
            const cartStorage = {};
            const { goodsMap } = getApp().globalData;

            if (isEmpty(goodsMap)) {
              return;
            }

            lines.forEach((line = {}) => {
              const { goodsUuid, goodsQty } = line;
              const goods = goodsMap[goodsUuid] || {};
              const { categoryUuid, categoryName } = goods;

              // 类别信息
              if (!cartStorage[categoryUuid]) {
                cartStorage[categoryUuid] = {};
                cartStorage[categoryUuid].checked = true;
                cartStorage[categoryUuid].label = categoryName;
              }

              // 商品Map
              if (!cartStorage[categoryUuid].lines) {
                cartStorage[categoryUuid].lines = {};
              }

              goods.checked = true;
              goods.quantity = goodsQty;
              cartStorage[categoryUuid].lines[goodsUuid] = goods;
            });

            uni.setStorageSync(this.$constants.CART, cartStorage);
            uni.switchTab({ url: '/pages/order/cart' });
          }
        },
      });
    },
  },
};
