<!--该组件主要是为了防止图片加载失败对布局的影响，暂时默认图片加载失败背景图为灰色，之后有需要在修改-->
<template>
  <div class="safe-img-box" :class="{'safe-img-error': error || !src}" :style="{ width, height }">
    <img v-if="!error && src" class="safe-img" :src="src" alt="" @error="handleError">
  </div>
</template>

<script>
  export default {
    name: 'SafeImg',
    props: {
      width: String,
      height: String,
      src: String,
    },
    data() {
      return {
        error: false,
      };
    },
    watch: {
      src() {
        this.error = false;
      },
    },
    methods: {
      handleError() {
        this.error = true;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .safe-img-box {
    position: relative;
    display: inline-block;
    vertical-align: middle;

    &.safe-img-error {
      background-color: #EFEFEF;
    }

    .safe-img {
      width: 100%;
      height: 100%;
      vertical-align: auto;
    }
  }

</style>
