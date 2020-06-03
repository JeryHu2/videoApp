<template>
  <div style="overflow:hidden" class="user_container">
    <div class="header">
      <div class="logo" @click="trigTo('home')" v-show="!purchaseFee"></div>
      <div class="tablist">
        <div class="rightbtns">
          <ul>
            <li
              @click="trigTo('user')"
              v-items="{default:true}"
              ref="userIcon"
              @right="right"
              @down="down"
            >
              <i class="user_logo"></i>
              <label>个人中心</label>
            </li>
            <li @click="trigTo('review')" v-items @left="left" @right="right" @down="down()">
              <i class="eye_logo"></i>
              <label>浏览历史</label>
            </li>
            <li @click="trigTo('collection')" v-items @left="left" @down="down">
              <i class="star_logo"></i>
              <label>收藏记录</label>
            </li>
          </ul>
        </div>
        <div class="title" v-show="!purchaseFee">
          <span class="line">——</span>
          个人中心
          <span class="line">——</span>
        </div>
      </div>
    </div>
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
        <div class="logo"></div>
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
import { epgMethods } from "../utils/epg";
import Qs from "qs";
import { Loading } from "element-ui";
import url from "@/api/videoApi.js";

export default {
  data() {
    return {
      videoData: {
        review: {
          name: "浏览历史",
          list: []
        },
        collection: {
          name: "收藏记录",
          list: []
        }
      },
      purchaseFee: false,
      feeList: []
    };
  },
  created() {
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
    // let userId = Authentication.CTCGetConfig("UserID");
    let userId = { userId: "yagnxiuyuan" };
    this.getReviewList(userId);
    this.getCollectList(userId);
  },
  methods: {
    trigTo(path) {
      switch (path) {
        case "user":
          this.routerName = "个人中心";
          this.$router.push({ path: "/user" });
          break;
        case "review":
          this.routerName = "浏览历史";
          this.$router.push({ path: "/review" });
          break;
        case "collection":
          this.routerName = "收藏记录";
          this.$router.push({ path: "/collection" });
          break;
      }
    },
    goToPurchase() {
      this.purchaseFee = true;
    },
    getReviewList(params) {
      let loadingInstance = Loading.service({
        text: "请稍等",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".loadingtext")
      });
      let num = 0;
      let userId = "yagnxiuyuan";

      if (params) {
        userId = Qs.stringify(params);
      } else {
        userId = Qs.stringify({ userId: userId });
      }
      let that = this;
      that.$axios
        .post(url.getClick, userId)
        .then(res => {
          let showVideoData = [];
          if (res.data.code == "200" && res.data.data.length > 0) {
            res.data.data.map(o => {
              showVideoData.push({
                name: o.name,
                id: o.id,
                img: o.pathPic2,
                showTitle: o.showTitle
              });
            });
            that.videoData.review.list = showVideoData.splice(0, 3);
            loadingInstance.close();
          }
        })
        .catch(err => {
          console.log(err);
          loadingInstance.close();
        });
    },
    getCollectList(params) {
      let loadingInstance = Loading.service({
        text: "请稍等",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".loadingtext")
      });
      let num = 0;
      let userId = "yagnxiuyuan";
      let that = this;

      if (params) {
        userId = Qs.stringify(params);
      } else {
        userId = Qs.stringify({ userId: userId });
      }
      that.$axios
        .post(url.getCollect, userId)
        .then(res => {
          let showVideoData = [];
          if (res.data.code == "200" && res.data.data.length > 0) {
            res.data.data.map(o => {
              showVideoData.push({
                name: o.name,
                id: o.id,
                img: o.pathPic2,
                showTitle: o.showTitle
              });
            });
            that.videoData.collection.list = showVideoData.splice(0, 3);
            loadingInstance.close();
          }
        })
        .catch(err => {
          console.log(err);
          loadingInstance.close();
        });
    },
    ...epgMethods
  },
  components: {
    CardList,
    CardFee
  }
};
</script>
<style scoped>
.user_container {
  width: 95%;
  height: 98%;
  background: url(../static/image/home/home_back.jpg) no-repeat 0 0;
  background-size: 100% 100%;
  padding: 1% 2.5%;
  font-family: "微软雅黑";
  position: relative;
}
.header {
  height: 45px;
}
.header .logo {
  width: 160px;
  height: 160px;
  margin: 20px 0 0 50px;
  float: left;
  cursor: pointer;
  background: url(../static/image/home/logo.png) no-repeat 0 0;
  background-size: contain;
}
.header .tablist {
  width: calc(100% - 400px);
  float: right;
}
.header .tablist .rightbtns {
  width: 100%;
  height: 100px;
}
.header .tablist .rightbtns ul {
  height: 60px;
  line-height: 60px;
  font-size: 25px;
  font-family: "微软雅黑";
  float: right;
}
.header .tablist .rightbtns ul li {
  float: left;
  margin: 0 10px;
}
.header .tablist .rightbtns ul li label {
  cursor: pointer;
}
.header .tablist .rightbtns ul li i {
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.header .tablist .rightbtns ul li i.user_logo {
  background: url(../static/image/home/logo_man.png) no-repeat center;
  background-size: 100% 100%;
}
.header .tablist .rightbtns ul li i.eye_logo {
  background: url(../static/image/home/logo_view.png) no-repeat center;
  background-size: 100% 100%;
}
.header .tablist .rightbtns ul li i.star_logo {
  background: url(../static/image/home/logo_star.png) no-repeat center;
  background-size: 100% 100%;
}
.header .title {
  margin-left: 100px;
  text-align: left;
  float: left;
}
.pur_top {
  width: 100%;
  float: left;
  height: 180px;
  background: #fff;
  border-radius: 12px;
}
.pur_top .left_sec {
  float: left;
  width: 54%;
  margin: 34px auto;
  font-size: 25px;
}
.pur_top .left_sec img {
  height: 95px;
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
  width: 200px;
  height: 68px;
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
}
.pur_bottom .half {
  width: 43.5%;
  float: left;
  padding: 30px;
  background: #fff;
  border-radius: 16px;
}
.pur_bottom .collection {
  margin-left: 3%;
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
