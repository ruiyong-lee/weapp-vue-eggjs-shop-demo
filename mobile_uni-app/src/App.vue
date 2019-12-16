<script>
  export default {
    globalData: {
      refreshPage: false, // 控制刷新页面，比如保存返回刷新数据
      goodsMap: {}, // 商品map
      userInfo: {}, // 微信用户信息
      order: {}, // 待提交的订单
    },
    onLaunch() {
      const res = uni.getSystemInfoSync();

      // 针对iphone x 系列做特殊处理
      if (res.model.search('iPhone X') !== -1) {
        uni.isIphoneX = true;
      }
    },
  };
</script>

<style lang="scss">
  @import "lib/colorui/main.css";
  @import "lib/colorui/icon.css";
  @import "style/common.scss";
</style>
