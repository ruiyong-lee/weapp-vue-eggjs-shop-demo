module.exports = {
  closeImgDialog() {
    var animation = this.animation;
    
    animation.scale(1, 1).step()
    this.setData({
      'imgDialog.showImgDialog': false,
      'imgDialog.animationData': animation.export()
    })
  }
};