<template>
  <div class="review">
    <div class="header">
      <div class="logo" @click="trigTo('home')"></div>
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
        <div class="title">
          <span class="line">——</span>
          收藏记录
          <span class="line">——</span>
        </div>
      </div>
    </div>
    <div class="overrow">
      <Card
        class="card_item"
        @openDetails="openDetails"
        v-for="item in showVideoData"
        :key="item.id"
        :project="item"
        @left="left()"
        @right="right()"
        @up="up()"
        @down="down()"
        v-items
      ></Card>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="paginationData.currentPage"
        :page-size="paginationData.pageSize"
        background
        layout="total,prev, pager, next"
        :total="paginationData.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import Card from "../components/card";
import url from "@/api/videoApi.js";
import Qs from "qs";
import { Loading } from "element-ui";
import { epgMethods } from "../utils/epg";

export default {
  data() {
    return {
      videoData: [],
      paginationData: {
        total: 12,
        pageSize: 12,
        currentPage: 1
      },
      showVideoData: []
    };
  },
  mounted() {
    this.showList();
    let el = document.getElementsByClassName("card_item")[0];
    this.$service.move(el);
    let that = this;
    document.onkeydown = function(e) {
      if (e.keyCode == 8) {
        that.$router.go(-1);
      }
    };
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
    openDetails() {},
    handleSizeChange(val) {
      this.paginationData.pageSize = val;
      this.showList();
    },
    handleCurrentChange(val) {
      this.paginationData.currentPage = val;
      this.showList();
    },
    showList() {
      let userId = Authentication.CTCGetConfig("UserID");
      this.showVideoData = [];
      this.getMenuList({ userId: userId });
    },
    getMenuList(params) {
      let loadingInstance = Loading.service({
        text: "请稍等",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".loadingtext")
      });
      this.videoData = {};
      this.listData = [];
      let num = 0;
      let userId = "yagnxiuyuan";

      if (params) {
        userId = Qs.stringify(params);
      } else {
        userId = Qs.stringify({ userId: userId });
      }
      this.$axios
        .post(url.getCollect, userId)
        .then(res => {
          if (res.data.code == "200" && res.data.data.length > 0) {
            res.data.data.map(o => {
              this.showVideoData.push({
                name: o.name,
                id: o.id,
                img: o.pathPic2,
                showTitle: o.showTitle
              });
            });
            this.paginationData.total = res.data.total_count;
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
    Card
  }
};
</script>
<style scoped>
.review {
  width: 95%;
  height: 98%;
  background: url(../static/image/home/home_back.jpg) no-repeat 0 0;
  background-size: 100% 100%;
  padding: 1% 2.5%;
  font-family: "微软雅黑";
  position: relative;
}
.header {
  height: 150px;
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
  width: 1000px;
  float: right;
}
.header .tablist .rightbtns {
  width: 100%;
  height: 100px;
}
.header .tablist .rightbtns ul {
  height: 60px;
  font-size: 25px;
  font-family: "微软雅黑";
  float: right;
  margin: 10px 0;
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
  width: 25px;
  height: 24px;
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
  margin-left: -180px;
  font-size: 24px;
  font-weight: 600;
}
.overrow {
  overflow: hidden;
  margin: 0 auto;
  height: 500px;
  background: #f5f7fa;
  border-radius: 20px;
  width: 90%;
}
.overrow .videoPro {
  cursor: pointer;
  width: 160px;
  float: left;
  margin: 30px 0 0 45px;
  height: 180px;
}
.el-pagination {
  float: left;
  margin: 50px auto;
  width: 100%;
}
/* @media (max-width: 1280px) {
  .overrow .videoPro {
    cursor: pointer;
    width: 160px;
    float: left;
    margin: 30px 0 0 40px;
    height: 180px;
  }
} */
</style>
