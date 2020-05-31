<template>
  <div style="overflow:hidden" class="user_container">
    <div class="pur_top" v-show="!purchaseFee">
      <div class="left_sec">
        <img src="../static/image/user/logo_header.png" alt="user.jpg" />
        <label>没有订购</label>
      </div>
      <div class="deline"></div>
      <div class="right_sec">
        <div @click="goToPurchase()" class="pur_button" v-items></div>
        <p>快速订购通道已开启，去订购吧!</p>
      </div>
    </div>
    <div class="pur_bottom" v-show="!purchaseFee">
      <div class="view half">
        <CardList :project="videoData.review"></CardList>
      </div>
      <div class="collection half">
        <CardList :project="videoData.collection"></CardList>
      </div>
    </div>
    <div class="purchase_detail" v-show="purchaseFee">
      <div class="fee_header">
        <div class="logo" v-items></div>
        <div class="tips">
          <h3>亲子园会员 订购服务</h3>
          <p>购买完成后可直接播放</p>
        </div>
      </div>
      <div class="fee_bottom">
        <CardFee :card="item" v-for="item in feeList" :key="item.key" v-items></CardFee>
      </div>
    </div>
  </div>
</template>
<script>
import CardList from "../components/cardList";
import CardFee from "../components/cardFee";

export default {
  data() {
    return {
      videoData: [],
      purchaseFee: false,
      feeList: []
    };
  },
  created() {
    this.videoData = {
      review: {
        name: "浏览历史",
        list: [
          {
            id: "ran_1",
            label: "熊猫笔记 全集",
            img: "./static/image/user/333.jpg"
          },
          {
            id: "ran_2",
            label: "",
            img: "./static/image/user/333.jpg"
          },
          {
            id: "ran_3",
            label: "",
            img: "./static/image/user/333.jpg"
          }
        ]
      },
      collection: {
        name: "收藏记录",
        list: [
          {
            id: "ran_12",
            label: "小猪佩奇 全集",
            img: "./static/image/user/333.jpg"
          },
          {
            id: "ran_13",
            label: "小猪佩奇",
            img: "./static/image/user/333.jpg"
          },
          {
            id: "ran_14",
            label: "熊猫笔记 全集",
            img: "./static/image/user/333.jpg"
          }
        ]
      }
    };
    this.feeList = [
      {
        key: "month",
        money: "20",
        discount: "",
        plan: "包月费用"
      },
      {
        key: "quarter",
        money: "50",
        discount: "",
        plan: "包季费用"
      },
      {
        key: "year",
        money: "88",
        discount: "",
        plan: "包年费用"
      }
    ];
  },
  mounted() {
    let that = this;
    document.onkeydown = function(e) {
      if (e.keyCode == 8) {
        that.$router.go(-1);
      }
    };
  },
  methods: {
    openDetails() {},
    goToPurchase() {
      this.$parent.ispurchaseFee = true;
      this.purchaseFee = true;
    }
  },
  components: {
    CardList,
    CardFee
  }
};
</script>
<style scoped>
.user_container {
  height: 100%;
  width: 100%;
}
.pur_top {
  width: 100%;
  float: left;
  height: 220px;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
}
.pur_top .left_sec {
  float: left;
  width: 54%;
  margin: 34px auto;
  font-size: 35px;
}
.pur_top .left_sec img {
  height: 115px;
  vertical-align: middle;
  margin-right: 50px;
}
.pur_top .deline {
  border-left: 2px solid lightskyblue;
  height: 100%;
  float: left;
}
.pur_top .right_sec {
  float: right;
  width: 45%;
}
.pur_top .right_sec p {
  font-size: 25px;
  font-weight: 600;
}
.pur_top .right_sec .pur_button {
  cursor: pointer;
  width: 250px;
  height: 80px;
  margin: 25px auto;
  background: url(../static/image/user/purch_now.png) no-repeat 0 0;
  background-size: 100% 100%;
}
.pur_top .right_sec .pur_button:hover {
  background: url(../static/image/user/purch_now_hover.png) no-repeat 0 0;
  background-size: 100% 100%;
}
.pur_bottom {
  float: left;
  width: 100%;
  margin-top: 40px;
  height: calc(100% - 260px);
}
.pur_bottom .half {
  width: 47.5%;
  float: left;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
}
.pur_bottom .collection {
  margin-left: 5%;
}
.purchase_detail {
  overflow: hidden;
  height: 100%;
  padding: 20px;
}
.fee_header {
  height: 1.302083rem;
  width: 50%;
  padding: 0.104167rem;
  margin: 0 auto;
  margin-top: -60px;
  margin-bottom: 70px;
}
.fee_header .logo {
  width: 200px;
  height: 100%;
  margin: 20px 0 0 50px;
  float: left;
  background: url(../static/image/home/logo.png) no-repeat 0 0;
  background-size: contain;
}
.fee_header .tips {
  float: right;
  width: 2.5rem;
  margin-top: 75px;
  text-align: left;
}
.fee_header .tips h3 {
  font-size: 50px;
  font-weight: 600;
}
.fee_header .tips p {
  font-size: 25px;
}
.fee_bottom {
  height: calc(100% - 200px);
  width: 100%;
  margin-left: 250px;
}
/* @media (max-width: 1280px) {
  .pur_top {
    width: 100%;
    float: left;
    height: 180px;
    background: #fff;
    border-radius: 16px;
    padding: 20px 0;
  }
  .pur_top .left_sec {
    float: left;
    width: 54%;
    margin: 34px auto;
    font-size: 25px;
  }
  .pur_top .left_sec img {
    height: 100px;
    vertical-align: middle;
    margin-right: 50px;
  }
  .pur_top .right_sec .pur_button {
    cursor: pointer;
    width: 200px;
    height: 75px;
    margin: 25px auto;
  }
  .pur_bottom {
    float: left;
    width: 100%;
    margin-top: 30px;
    height: 250px;
  }
  .pur_bottom .half {
    width: 42.5%;
    float: left;
    padding: 26px;
    background: #fff;
    border-radius: 16px;
  }
} */
</style>
