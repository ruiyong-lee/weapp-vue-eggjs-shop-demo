// pages/order/order.js
var ZanTab = require('../../style/zanui/tab/index');

Page(Object.assign({}, ZanTab, {
  data: {
    tab: {
      list: [
        { id: 'all', title: '全部' },
        { id: 'unPayment', title: '待付款' },
        { id: 'receipted', title: '已接单' },
        { id: 'dispatching', title: '配送中' },
        { id: 'completed', title: '已完成' },
        { id: 'canceled', title: '已取消' }
      ],
      selectedId: 'all',
      scroll: true,
      height: 45
    }
  },

  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;

    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
  }
}));