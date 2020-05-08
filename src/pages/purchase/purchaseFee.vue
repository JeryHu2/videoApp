<template>
  <div class="purchase_detail">
    <div class="fee_header">
      <div class="logo" v-items></div>
      <div class="tips">
        <h3>亲子园会员 订购服务</h3>
        <p>购买完成后可直接播放</p>
      </div>
    </div>
    <div class="fee_bottom"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.purchase_detail {
  overflow: hidden;
  height: 100%;
  padding: 20px;
}
.fee_header {
  height: 200px;
  width: 45%;
  padding: 20px;
  margin: 0 auto;
}
.fee_header .logo {
  width: 200px;
  height: 100%;
  margin: 20px 0 0 50px;
  float: left;
  background: url(../../static/image/home/logo.png) no-repeat 0 0;
  background-size: contain;
}
.fee_header .tips {
  float: right;
  width: 480px;
  font-weight: 600;
}
.fee_header .tips h3 {
  font-size: 50px;
}
.fee_header .tips p {
  font-size: 30px;
}
.fee_bottom {
  height: calc(100% - 200px);
  width: 100%;
}
</style>
