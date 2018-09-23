<!--控件: 分页器-->
<template>
  <div class="v-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :background="background"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      pageSize: {
        type: Number,
        required: true,
      },
      totalCount: {
        type: Number,
        required: true,
      },
      pageSizes: {
        type: Array,
        required: true,
      },
      background: {
        type: Boolean,
        default: true,
      },
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper',
      },
    },
    methods: {
      handleSizeChange(pageSize) {
        this.$emit('update:pageSize', pageSize);
        this.$emit('handlePageChange');
      },
      handleCurrentChange(page) {
        if (this.currentPage !== page) {
          this.$emit('update:currentPage', page);
          this.$emit('handlePageChange');
        }
      },
    },
  };
</script>
<style lang="scss">
  .v-pagination {
    margin-top: 15px;
    text-align: center;
  }
</style>
