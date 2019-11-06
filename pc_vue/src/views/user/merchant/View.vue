<template>
  <div>
    <el-form :model="merchantForm" label-width="7em"
             size="small" @submit.native.prevent>
      <el-row>
        <el-col :span="11">
          <h2 class="content-title"><i class="el-icon-tickets"></i> 基础资料</h2>
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
          <h2 class="content-title"><i class="el-icon-tickets"></i> 登录资料</h2>
          <el-form-item label="账号">
            {{merchantForm.userName}}
          </el-form-item>
          <el-form-item label="状态">
            <span class="el-switch-text" :class="merchantForm.enableStatus | formatEnableStatusToClass">
              {{merchantForm.enableStatus | formatEnableStatusToCN}}
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <h2 class="content-title"><i class="el-icon-connection"></i> 关联小程序</h2>
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
  import { pageMixin } from '../../../utils/mixins/common';

  export default {
    name: 'merchantView',
    mixins: [pageMixin],
    components: {},
    data() {
      const { REFRESH_DATA_CALLBACK_MAP, MERCHANT, APP_PAGE_TOOLS } = this.$Constants;
      this[REFRESH_DATA_CALLBACK_MAP] = {
        [MERCHANT]: this.get,
      };
      this[APP_PAGE_TOOLS] = [
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
      async get() {
        const { merchantUuid: uuid } = this.$route.params;
        this.merchantForm = await this.$api.merchant.get({ uuid });
      },
    },
  };
</script>
