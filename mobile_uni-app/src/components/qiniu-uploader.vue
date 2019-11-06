<template>
  <view>
    <view class="cu-bar bg-white" :class="{ 'margin-top': marginTop }">
      <view class="action">{{title}}</view>
      <view class="action"></view>
    </view>
    <view class="cu-form-group">
      <view class="qiniu-uploader grid col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item, index) in imgList" :key="index" @tap="viewImage(item)">
          <image :src="item" mode="aspectFill"></image>
          <view class="qiniu-uploader-delete bg-orange" @tap.stop="delImg(index)">
            <text class='cuIcon-close'></text>
          </view>
          <view v-if="uploadMap[index] && !uploadMap[index].success"
                class="qiniu-uploader-progress flex align-center">
            <view v-if="uploadMap[index].error" class="text-red">
              <text class='cuIcon-infofill qiniu-uploader-error__icon'></text>
              <view class="margin-top-xs">上传失败</view>
            </view>
            <view v-else class="flex-sub">
              <view class="margin-bottom-xs" :class="{ 'text-red': uploadMap[index].error}">
                {{uploadMap[index].progress + '%'}}
              </view>
              <view class="cu-progress round sm">
                <view class="bg-green" :style="[{ width: uploadMap[index].progress + '%' }]"></view>
              </view>
            </view>
          </view>
        </view>
        <view class="solids" @tap="chooseImage">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import uuidv1 from 'uuid/v1';

  const uploadURL = 'https://up.qiniup.com'; // 上传地址
  const keyPrefix = 'DX-TMS/img/images/'; // key的前缀

  export default {
    data() {
      return {
        imgList: [], // 图片列表
        uploadMap: {}, // 记录上传状态
      };
    },
    props: {
      marginTop: {
        type: Boolean,
        default: true,
      },
      title: {
        type: String,
        default: '图片上传',
      },
      list: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    watch: {
      list(val = []) {
        this.imgList = val;
      },
    },
    computed: {},
    methods: {
      // 选择图片
      chooseImage() {
        uni.chooseImage({
          count: 9, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: (res) => {
            const { tempFilePaths = [] } = res;
            const len = this.imgList.length;

            // 界面先展示
            if (len !== 0) {
              this.imgList = [...this.imgList, ...tempFilePaths];
            } else {
              this.imgList = tempFilePaths;
            }

            // 通知父组件开始上传
            this.$emit('start');

            // 开始上传
            this.uploadImage(tempFilePaths, len);
          },
        });
      },
      // 上传图片，paths:图片列表，length:已经上传的图片数量
      async uploadImage(paths = [], length = 0) {
        let count = 0; // 已上传数量（包含上传失败的）
        const { qiniuHost, token } = await this.$api.qiniu.token() || {};

        paths.forEach((path, index) => {
          const uploadKey = length + index;

          this.$set(this.uploadMap, uploadKey, {
            progress: 0, // 进度条
            error: false, // 上传失败标记
            success: false, // 上传成功标记
          });

          uni.getImageInfo({
            src: path,
            success: (image) => {
              const uploadTask = uni.uploadFile({
                url: uploadURL,
                filePath: path,
                name: 'file',
                formData: {
                  token,
                  key: `${keyPrefix}${this.$util.formatToDay()}/${uuidv1()}.${image.type || 'jpg'}`, // H5端获取不到文件类型，默认设置jpg
                },
                success: (uploadFileRes) => {
                  const resData = JSON.parse(uploadFileRes.data);
                  uni.showToast({ title: '上传成功', icon: 'none' });
                  this.uploadMap[uploadKey].success = true; // 记录图片上传成功
                  this.imgList[uploadKey] = `${qiniuHost}/${resData.key}`; // 替换为图片的服务器路径
                },
                fail: () => {
                  uni.showToast({ title: '上传失败', icon: 'none' });
                  this.uploadMap[uploadKey].error = true; // 记录图片上传失败
                },
                complete: () => {
                  count += 1;

                  if (count === paths.length) {
                    // 通知父组件上传完成, 并传递图片数组
                    this.$emit('complete', this.imgList);
                  }
                },
              });

              uploadTask.onProgressUpdate((res) => {
                this.uploadMap[uploadKey].progress = res.progress; // 记录上传进度
              });
            },
          });
        });
      },
      // 预览图片
      viewImage(url) {
        uni.previewImage({
          urls: this.imgList,
          current: url,
        });
      },
      // 删除图片
      delImg(index) {
        uni.showModal({
          title: '提示',
          content: '确定要删除此图片？',
          success: (res) => {
            if (res.confirm) {
              this.imgList.splice(index, 1);
              this.$delete(this.uploadMap, index);
              // 通知父组件删除完成, 并传递图片数组
              this.$emit('complete', this.imgList);
            }
          },
        });
      },
    },
    mounted() {
    },
  };
</script>

<style lang="scss">
  .qiniu-uploader {
    .qiniu-uploader-error__icon {
      font-size: rpx(36);
    }

    .qiniu-uploader-delete {
      position: absolute;
      z-index: 3;
      right: 0;
      top: 0;
      width: rpx(48);
      height: rpx(36);
      line-height: rpx(36);
      text-align: center;
    }

    .qiniu-uploader-progress {
      position: absolute;
      padding: 0 rpx(20);
      width: 100%;
      height: 100%;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
</style>
