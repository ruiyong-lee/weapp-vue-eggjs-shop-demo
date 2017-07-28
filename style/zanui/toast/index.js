module.exports = {
  showZanToast(title, timeout) {
    var zanToast = this.data.zanToast || {};
    clearTimeout(zanToast.timer);

    // 弹层设置~
    zanToast = {
      show: true,
      title
    };
    console.log(this.data)
    this.setData({
      zanToast
    });

    console.log(this.data)

    var timer = setTimeout(() => {
      this.clearZanToast();
    }, timeout || 3000);

    this.setData({
      'zanToast.timer': timer
    });
  },

  clearZanToast() {
    var zanToast = this.data.zanToast || {};
    clearTimeout(zanToast.timer);

    this.setData({
      'zanToast.show': false
    });
  }
};
