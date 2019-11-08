<script>
  export default {
    globalData: {
      refreshPage: false,
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
