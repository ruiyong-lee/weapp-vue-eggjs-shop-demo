<template>
  <view class="radio-modal cu-modal bottom-modal" :class="{ show }" @tap="hideModal">
    <view class="cu-dialog" @tap.stop="">
      <view class="radio-modal-header solid-bottom">
        <view class="cu-bar search bg-white">
          <view class="action">
            <button class="cu-btn shadow-blur round" @tap="show = false">取消</button>
          </view>
          <view class="search-form round">
            <text class="cuIcon-search"></text>
            <input type="text" class="radio-modal-input" placeholder="输入关键字"
                   confirm-type="search" v-model="keywords" @confirm="search"></input>
          </view>
          <view class="action">
            <button class="cu-btn bg-blue shadow-blur round" @tap="search">搜索</button>
          </view>
        </view>
      </view>
      <view class="radio-modal-body">
        <radio-group class="block" @change="radioChange">
          <view class="cu-list menu text-left">
            <view class="cu-item" v-for="(item, index) in list" :key="index">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">{{item[labelField]}}</view>
                <radio class="blue round"
                       :class="String(index) === String(selectedIndex) ? 'checked' : ''"
                       :checked="String(index) === String(selectedIndex)"
                       :value="String(index)"></radio>
              </label>
            </view>
            <view v-if="list.length === 0" class="cu-item radio-modal-empty">暂无数据</view>
          </view>
        </radio-group>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        keywords: '',
      };
    },
    props: {
      list: Array,
      selectedIndex: [Number, undefined],
      labelField: {
        type: String,
        default: 'label',
      },
    },
    watch: {
      list() {
        // 列表改变清空选中项
        this.$emit('update:selectedIndex', undefined);
      },
    },
    computed: {},
    methods: {
      showModal() {
        this.show = true;
      },
      hideModal() {
        this.show = false;
      },
      radioChange(e) {
        const { value } = e.detail;
        this.show = false;
        this.$emit('update:selectedIndex', value);
        this.$emit('change', value);
      },
      search() {
        this.$emit('search', this.keywords);
      },
    },
    mounted() {
    },
  };
</script>

<style lang="scss">
  .radio-modal {
    .radio-modal-header {
      .radio-modal-input {
        height: rpx(32);
        font-size: rpx(32);
        text-align: left;
      }
    }

    .radio-modal-body {
      max-height: 60vh;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      .radio-modal-empty {
        justify-content: center !important;
      }
    }
  }
</style>
