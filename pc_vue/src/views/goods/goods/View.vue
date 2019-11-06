<template>
  <div>
    <el-row>
      <h2 class="content-title"><i class="el-icon-tickets"></i> 基本信息</h2>
      <section class="goods-panel">
        <el-carousel class="goods-images" :autoplay="false" height="240px">
          <el-carousel-item v-for="item in imagesList" :key="item">
            <safe-img :src="item" width="240px" height="240px"></safe-img>
          </el-carousel-item>
        </el-carousel>
        <div class="goods-data">
          <h3 class="goods-name">{{goods.name}}</h3>
          <p>类别：<span class="text-bold">{{goods.categoryName}}</span></p>
          <p>规格：<span class="text-bold">{{goods.spec}}</span></p>
          <p>单位：<span class="text-bold">{{goods.unitName}}</span></p>
          <p>售价：<span class="text-red text-bold">¥ {{goods.salePrice}}</span></p>
          <p>状态：
            <span class="badge" :class="goods.status | formatGoodsStatusToClass">
              {{goods.status | formatGoodsStatusToCN}}
            </span>
          </p>
        </div>
      </section>
    </el-row>
    <el-row class="mt-20">
      <h2 class="content-title"><i class="el-icon-goods"></i> 商品介绍</h2>
      <div class="goods-info">{{goods.info || '暂无介绍'}}</div>
    </el-row>
  </div>
</template>

<script>
  import { pageMixin } from '../../../utils/mixins/common';
  import goodsMixin from '../../../utils/mixins/goods';

  export default {
    name: 'goodsView',
    mixins: [pageMixin, goodsMixin],
    components: {},
    data() {
      this[this.$Constants.APP_PAGE_TOOLS] = [
        {},
        {
          icon: 'el-icon-edit',
          content: '编辑',
          callback: this.linkToEdit,
          type: 'primary',
        },
      ];
      return {
        goods: {},
        imagesList: [],
      };
    },
    watch: {
      'goods.status': {
        handler() {
          const { APP_PAGE_TOOLS } = this.$Constants;
          switch (this.goods.status) {
            case 'up':
              this[APP_PAGE_TOOLS].splice(0, 1, {
                icon: 'el-icon-sold-out',
                content: '下架',
                callback: this.downGoods,
                type: 'danger',
              });
              break;
            case 'down':
              this[APP_PAGE_TOOLS].splice(0, 1, {
                icon: 'el-icon-sell',
                content: '上架',
                callback: this.upGoods,
                type: 'success',
              });
              break;
            default:
              break;
          }
        },
        immediate: true,
      },
    },
    methods: {
      async refreshPage() {
        await this.get();
      },
      async get() {
        const params = {
          uuid: this.$route.params.goodsUuid,
        };

        const res = await this.$api.goods.get(params);
        this.goods = res;
        this.imagesList = (res.imagesJsonStr && JSON.parse(res.imagesJsonStr)) || [];
      },
      async upGoods() {
        const { uuid, version } = this.goods;
        await this.$api.goods.up({ uuid, version });
        this.$message({ message: '商品上架成功', type: 'success' });
        this.refreshPage();
      },
      async downGoods() {
        const { uuid, version } = this.goods;
        await this.$api.goods.down({ uuid, version });
        this.$message({ message: '商品下架成功', type: 'success' });
        this.refreshPage();
      },
      linkToEdit() {
        this.$router.push({ name: 'goodsEdit', params: { goodsUuid: this.goods.uuid } });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .goods-panel {
    display: flex;

    .goods-images {
      flex: 0 0 240px;
      border: 1px solid #eee;
      border-radius: 6px;
      background: url("../../../assets/no-pic.png") no-repeat;
      background-size: 70%;
      background-position: 50% 50%;
    }

    .goods-data {
      flex: 1;
      padding-left: 30px;
      font-size: 16px;
      line-height: 2.2;

      .goods-name {
        font-size: 22px;
        font-weight: bold;
      }
    }
  }

  .goods-info {
    /*text-indent: 2em;*/
  }
</style>
