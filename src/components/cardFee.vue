<template>
  <div class="card_body" @click="takeOrder(card.key)">
    <div class="money">
      <span>¥</span>
      <span class="num">{{card.money}}</span>
    </div>
    <p v-show="card.discount !== ''">{{card.discount}}</p>
    <p v-show="card.discount == ''">暂无任何优惠</p>
    <div class="line"></div>
    <div class="label">{{card.plan}}</div>
  </div>
</template>
<script>
export default {
  props: ["card"],
  data() {
    return {};
  },
  methods: {
    takeOrder(data) {
      this.$router.push({
        path: "/purchaseConfirm",
        query: { feeId: data }
      });
    }
  }
};
</script>
<style>
.card_body {
  width: 350px;
  height: 450px;
  float: left;
  background: #fff;
  border-radius: 16px;
  margin: 0 50px;
  padding: 70px 30px;
  cursor: pointer;
}
.card_body .money {
  font-size: 50px;
}
.money .num {
  font-size: 80px;
}
.card_body p {
  font-size: 20px;
}
.card_body .line {
  border-top: 2px solid #ccc;
  margin: 20px 0 40px 0;
}
.card_body .label {
  font-size: 50px;
}
</style>
