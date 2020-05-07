<template>
  <div class="confirm_container">
    <div class="comfirming" v-if="!showPurchasing">
      <div class="title"></div>
      <div class="fee">
        <span>产品资费：</span>
        <span>{{ product.fee }}</span>
      </div>
      <div>
        <span class="line">——</span>
        <span>订购说明</span>
        <span class="line">——</span>
      </div>
      <div class="descrip">{{ product.description }}</div>
      <div>
        <div class="confirm btns" @click="confirmPurchase" v-items></div>
        <div class="cancel btns" @click="cancelPurchase" v-items></div>
      </div>
    </div>
    <div class="comfirmed" v-if="showPurchasing">
      <div class="title"></div>
      <div class="fee">
        <span>本次消费：</span>
        <span>{{ product.fee }}</span>
      </div>
      <div class="phone">
        <label>支付号码：</label>
        <label>{{ payment.phone }}</label>
      </div>
      <div class="paymentyz">
        <label for="code">支付验证：</label>
        <el-input
          style="width:200px"
          v-model="payment.total"
          size="medium"
          type="number"
          :max="99999999"
        ></el-input>
        <img
          src="../../static/image/purchase/pur_jy.png"
          alt="验证码"
          style="width:160px;"
        />
      </div>
      <div>
        <div class="confirm btns" @click="submit" v-items></div>
        <div class="cancel btns" @click="cancel" v-items></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: {
        id: "month",
        fee: "20元/月",
        description:
          "猫和老鼠是由华纳正版IP授权，网易游侠诚意打造的欢乐互动手游。猫鼠追逃，尽享互动乐趣。智勇较量，谁能赢得胜利？"
      },
      payment: {
        id: "month",
        fee: "20元/月",
        phone: "185****6528",
        codeL: 0,
        total: 0
      },
      showPurchasing: false,
      checkCode: 0
    };
  },
  created() {
    this.product.id = this.$route.query.feeId;
    switch (this.product.id) {
      case "month":
        this.product.fee = "20元/月";
        this.payment.fee = "20元/月";
        break;
      case "quarter":
        this.product.fee = "50元/季";
        this.payment.fee = "20元/月";
        break;
      case "year":
        this.product.fee = "88元/年";
        this.payment.fee = "20元/月";
        break;
    }
    this.checkCode = this.product.id;
  },
  methods: {
    confirmPurchase() {
      this.showPurchasing = true;
    },
    cancelPurchase() {
      this.$router.push({
        path: "/user"
      });
    },
    submit() {
      this.$router.push({
        path: "/purchaseResult",
        query: {
          code: this.checkCode
        }
      });
    },
    cancel() {
      this.showPurchasing = false;
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
  background: url(../../static/image/purchase/pur_confirm.png) no-repeat 0 0;
  background-size: contain;
}

.confirm_container .comfirmed .title {
  width: 100%;
  height: 250px;
  background: url(../../static/image/purchase/pur_jy.png) no-repeat 0 0;
  background-size: contain;
}
.confirm_container .comfirming .descrip {
  text-align: left;
}
.confirm_container .comfirming .fee {
  margin: 30px 0;
  font-size: 40px;
  color: #0d4993;
  font-weight: 600;
}
.confirm_container .btns {
  width: 250px;
  height: 80px;
  float: left;
  margin: 50px;
  cursor: pointer;
}
.confirm_container .confirm {
  background: url(../../static/image/purchase/confirm_pur.png) no-repeat 0 0;
  background-size: contain;
}
.confirm_container .cancel {
  background: url(../../static/image/purchase/cancel.png) no-repeat 0 0;
  background-size: contain;
}
.confirm_container >>> .el-input input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.confirm_container >>> .el-input input[type="number"] {
  -moz-appearance: textfield;
}
</style>
