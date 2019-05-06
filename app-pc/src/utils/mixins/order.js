// 混合

export default {
  methods: {
    // 开始配送
    async dispatch(order) {
      const { billNumber = '', uuid, version } = order;
      this.$confirm(`将开始配送订单：${billNumber}, 是否继续？`, '提示', {
        type: 'warning',
      }).then(async () => {
        await this.$api.order.dispatch({ uuid, version });
        this.$message({ message: '订单已开始配送', type: 'success' });
        this.query();
      }).catch(() => {
      });
    },
    // 完成
    async complete(order) {
      const { billNumber = '', uuid, version } = order;
      this.$confirm(`将完成订单：${billNumber}, 是否继续？`, '提示', {
        type: 'warning',
      }).then(async () => {
        await this.$api.order.complete({ uuid, version });
        this.$message({ message: '订单已完成', type: 'success' });
        this.query();
      }).catch(() => {
      });
    },
  },
};
