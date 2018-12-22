<template>
  <div>
    <el-form :model="merchantForm" label-width="7em" class="default-form"
             size="small" @submit.native.prevent>
      <el-row>
        <el-col :span="11">
          <h2 class="content-title">基础资料</h2>
          <el-form-item label="商家名称">
            {{merchantForm.name}}
          </el-form-item>
          <el-form-item label="联系人">
            {{merchantForm.linkMan}}
          </el-form-item>
          <el-form-item label="联系电话">
            {{merchantForm.linkPhone}}
          </el-form-item>
          <el-form-item label="详细地址">
            {{merchantForm.address}}
          </el-form-item>
          <el-form-item label="客服电话">
            {{merchantForm.servicePhone}}
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <h2 class="content-title">登录资料</h2>
          <el-form-item label="账号">
            {{merchantForm.userName}}
          </el-form-item>
          <el-form-item label="状态">
            <span class="el-switch-text" :class="$Constants.ENABLE_STATUS_CLASS[merchantForm.enableStatus]">
              {{$Constants.ENABLE_STATUS[merchantForm.enableStatus]}}
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <h2 class="content-title">关联小程序</h2>
          <el-form-item label="小程序ID：">
            {{merchantForm.appId}}
          </el-form-item>
          <el-form-item label="小程序密匙：">
            {{merchantForm.appSecret}}
          </el-form-item>
          <el-form-item label="商户号：">
            {{merchantForm.mchId}}
          </el-form-item>
          <el-form-item label="商户密匙：">
            {{merchantForm.mchKey}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { pageMixin } from '../../../utils/mixins';

  export default {
    name: 'merchantView',
    mixins: [pageMixin],
    components: {},
    data() {
      this[this.$Constants.REFRESH_DATA_CALLBACK_MAP] = {
        [this.$Constants.MERCHANT]: this.get,
      };
      this[this.$Constants.APP_PAGE_TOOLS] = [
        {
          icon: 'el-icon-edit',
          content: '编辑',
          callback: () => this.$router.push({ name: 'merchantEdit' }),
          type: 'primary',
        },
      ];
      return {
        merchantForm: {},
      };
    },
    methods: {
      refreshPage() {
        this.get();
      },
      get() {
        const { merchantUuid: uuid } = this.$route.params;

        this.$api.merchant.get({ uuid }).then((res) => {
          this.merchantForm = res;
        }).catch(() => {
        });
      },
    },
  };
</script>
