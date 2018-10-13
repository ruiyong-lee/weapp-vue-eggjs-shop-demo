<template>
  <div>
    <el-row class="app-view-tools">
      <el-col class="text-right" :span="12" :offset="12">
        <el-button type="primary" icon="el-icon-edit" size="mini" round @click="$router.push({name: 'merchantEdit'})">
          编辑
        </el-button>
      </el-col>
    </el-row>

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
      return {
        [this.$Constants.REFRESH_DATA_CALLBACK_MAP]: {
          [this.$Constants.MERCHANT]: this.get,
        },
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
