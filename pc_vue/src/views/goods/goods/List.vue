<template>
  <div>
    <el-form class="filter-form" :inline="true" ref="filterForm" :model="filter" size="mini" @submit.native.prevent>
      <el-form-item label="名称" prop="keywordsLike">
        <el-input v-model.trim="filter.keywordsLike" placeholder="商品名称"
                  clearable @keyup.enter.native="query"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="categoryUuid">
        <el-select v-model="filter.categoryUuid" placeholder="类别" clearable>
          <el-option v-for="item in categoryList" :key="item.uuid" :label="item.name" :value="item.uuid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="filter.status" placeholder="状态" clearable>
          <el-option v-for="(label, key) in $Constants.GOODS_STATUS" :key="key" :label="label" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button @click="mx_resetTable()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="defaultTable" :data="mx_defaultTableData" size="mini" @sort-change="mx_handleTableSortChange">
      <el-table-column prop="name" sortable="custom" label="名称" min-width="300">
        <div class="flex-y-center" slot-scope="scope">
          <safe-img :src="scope.row.thumbnail" width="30px" height="30px"></safe-img>
          <router-link class="ml-15 text-bold" :to="{name: 'goodsView', params: { goodsUuid: scope.row.uuid }}">
            {{scope.row.name}}
          </router-link>
        </div>
      </el-table-column>
      <el-table-column prop="salePrice" sortable="custom" label="售价">
        <template slot-scope="scope">
          <span v-if="scope.row.salePrice" class="text-red text-bold">¥ {{scope.row.salePrice}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="categoryName" label="类别" align="center"></el-table-column>
      <el-table-column prop="unitName" sortable="custom" label="单位"></el-table-column>
      <el-table-column prop="spec" sortable="custom" label="规格"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span class="badge" :class="scope.row.status | formatGoodsStatusToClass">
            {{scope.row.status | formatGoodsStatusToCN}}
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
  import { pageMixin, tableMixin } from '../../../utils/mixins/common';
  import goodsMixin from '../../../utils/mixins/goods';

  export default {
    name: 'goodsList',
    mixins: [pageMixin, tableMixin, goodsMixin],
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
      return {
        filter: {
          keywordsLike: '',
          categoryUuid: '',
          status: '',
        },
        categoryList: [],
      };
    },
    methods: {
      refreshPage() {
        this.query();
        this.getCategoryDropdownList();
      },
      async query() {
        const params = this.mx_getTableParams();
        params.filter = this.filter;
        const res = await this.$api.goods.query(params);
        this.mx_setTableData(res);
      },
      async getCategoryDropdownList() {
        this.categoryList = await this.$api.goodsCategory.getDropdownList();
      },
    },
  };
</script>
