<template>
  <div class="confirm_container">
    <div class="comfirming">
      <div class="title success" v-if="!isFail"></div>
      <div class="title fail" v-if="isFail"></div>
      <div class="descrip" v-if="isFail">抱歉，产品订购出现粗无，请拨打10010了解。</div>
      <div v-if="!isFail">
        <div class="confirm btns" @click="confirmPurchase"></div>
      </div>
      <div v-if="isFail">
        <div class="resetfirm btns" @click="resetPurchase"></div>
        <div class="cancel btns" @click="cancelPurchase"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isFail: false
    };
  },
  created() {
    this.isFail = this.$route.query.code != "year" ? false : true;
  },
  methods: {
    confirmPurchase() {
      this.$router.push({
        path: "/"
      });
    },
    cancelPurchase() {
      this.$router.push({
        path: "/user"
      });
    },
    resetPurchase() {
      this.$router.push({
        path: "/user",
        query: {
          code: "fail"
        }
      });
    }
  }
};
</script>
<style scoped>
.confirm_container {
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  font-size: 30px;
  font-family: 微软雅黑;
  height: 100%;
  background: url(../../static/image/purchase/purchase_back.jpg) no-repeat 0 0;
  background-size: 100% 100%;
}
.confirm_container .comfirming,
.confirm_container .comfirmed {
  width: 700px;
  margin: 120px auto;
}
.confirm_container .comfirming .title {
  width: 100%;
  height: 250px;
}
.confirm_container .comfirming .title.success {
  background: url(../../static/image/purchase/pur_success.png) no-repeat 0 0;
  background-size: contain;
}

.confirm_container .comfirming .title.fail {
  background: url(../../static/image/purchase/pur_fail.png) no-repeat 0 0;
  background-size: contain;
}
.confirm_container .comfirming .descrip {
  text-align: left;
  margin: 0.104167rem 0;
  color: #0d4993;
  font-weight: 500;
}
.confirm_container .btns {
  width: 250px;
  height: 80px;
  float: left;
  margin: 50px;
  cursor: pointer;
}
.confirm_container .confirm {
  background: url(../../static/image/purchase/confirm.png) no-repeat 0 0;
  background-size: contain;
  margin: 100px 180px;
}
.confirm_container .resetfirm {
  background: url(../../static/image/purchase/recycle_pur.png) no-repeat 0 0;
  background-size: contain;
}
.confirm_container .cancel {
  background: url(../../static/image/purchase/cancel.png) no-repeat 0 0;
  background-size: contain;
}
</style>