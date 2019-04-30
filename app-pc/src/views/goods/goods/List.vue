<template>
  <div>
    <el-table :data="mx_defaultTableData" size="mini">
      <el-table-column prop="name" label="名称" min-width="300">
        <div class="flex-y-center" slot-scope="scope">
          <safe-img :src="scope.row.thumbnail" width="30px" height="30px"></safe-img>
          <router-link class="ml-15 text-bold" :to="{name: 'goodsView', params: { goodsUuid: scope.row.uuid }}">
            {{scope.row.name}}
          </router-link>
        </div>
      </el-table-column>
      <el-table-column prop="salePrice" label="售价" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.salePrice" class="text-red text-bold">{{scope.row.salePrice}} 元</span>
        </template>
      </el-table-column>
      <el-table-column prop="categoryName" label="类别" align="center"></el-table-column>
      <el-table-column prop="unitName" label="单位" align="center"></el-table-column>
      <el-table-column prop="spec" label="规格" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <span class="badge" :class="$Constants.GOODS_STATUS_CLASS[scope.row.status]">
            {{$Constants.GOODS_STATUS[scope.row.status]}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="$router.push({ name: 'goodsEdit', params: { goodsUuid: scope.row.uuid } })"
          >
            编辑
          </el-button>
          <el-button v-if="scope.row.status === 'down'" class="success-text-btn"
                     type="text" size="mini" @click="upGoods(scope.row)">
            上架
          </el-button>
          <el-button v-if="scope.row.status === 'up'" class="danger-text-btn"
                     type="text" size="mini" @click="downGoods(scope.row)">
            下架
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :totalCount="mx_defaultPagination.count"
      :currentPage.sync="mx_defaultPagination.page"
      :pageSize.sync="mx_defaultPagination.pageSize"
      :pageSizes="mx_defaultPagination.pageSizes"
      @handlePageChange="query">
    </pagination>
  </div>
</template>

<script>
  import { pageMixin, tableMixin } from '../../../utils/mixins';

  export default {
    name: 'goodsList',
    mixins: [pageMixin, tableMixin],
    components: {},
    data() {
      const {
        REFRESH_DATA_CALLBACK_MAP, GOODS,
        GOODS_CATEGORY, APP_PAGE_TOOLS,
      } = this.$Constants;
      this[REFRESH_DATA_CALLBACK_MAP] = {
        [GOODS]: this.query,
        [GOODS_CATEGORY]: this.query,
      };
      this[APP_PAGE_TOOLS] = [
        {
          icon: 'el-icon-plus',
          content: '新增',
          callback: () => this.$router.push({ name: 'goodsAdd' }),
          type: 'primary',
        },
      ];
      return {};
    },
    methods: {
      refreshPage() {
        this.query();
      },
      async query() {
        const params = this.mx_getTableParams();
        const res = await this.$api.goods.query(params);
        this.mx_setTableData(res);
      },
      async upGoods(goods = {}) {
        const { uuid, version } = goods;
        await this.$api.goods.up({ uuid, version });
        this.$message({ message: '商品上架成功', type: 'success' });
        this.query();
      },
      async downGoods(goods = {}) {
        const { uuid, version } = goods;
        await this.$api.goods.down({ uuid, version });
        this.$message({ message: '商品下架成功', type: 'success' });
        this.query();
      },
    },
  };
</script>
