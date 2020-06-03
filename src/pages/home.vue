<template>
  <div style="overflow:hidden;width:100%;height:100%;">
    <div class="home">
      <div class="header" :class="{ user: ispurchaseFee }">
        <div class="logo" @click="trigTo('home')" v-show="!ispurchaseFee"></div>
        <div class="tablist">
          <div class="rightbtns">
            <ul>
              <li
                @click="trigTo('user')"
                v-items
                ref="userIcon"
                @right="right"
                @down="down"
                class="hd_item"
              >
                <i class="user_logo"></i>
                <label>个人中心</label>
              </li>
              <li @click="trigTo('review')" v-items class="hd_item">
                <i class="eye_logo"></i>
                <label>浏览历史</label>
              </li>
              <li @click="trigTo('collection')" v-items @left="left" @down="down" class="hd_item">
                <i class="star_logo"></i>
                <label>收藏记录</label>
              </li>
            </ul>
          </div>
          <div class="tabs" v-show="isHome">
            <Tabs></Tabs>
          </div>
          <div class="title" v-show="!isHome && !ispurchaseFee">
            <span class="line">——</span>
            {{ routerName }}
            <span class="line">——</span>
          </div>
        </div>
      </div>
      <div class="content home_tab" v-show="isHomeTab && isHome">
        <div class="list">
          <Project :userId="userId" :EPGDomain="temp"></Project>
        </div>
      </div>
      <!-- <div class="content other_tab" v-show="!isHomeTab && isHome">
        <div class="swiper">
          <List></List>
        </div>
        <div class="list" ref="videoList">
          <Project :userId="userId" :EPGDomain="temp"></Project>
        </div>
      </div>-->
      <div class="pig_icon" @mousedown="move" v-show="isHome"></div>
    </div>
  </div>
</template>
<script>
import List from "./home/list";
import Tabs from "./home/tabs";
import Project from "./home/project";
import { getUrlKey } from "../utils/utils";
import { epgMethods } from "../utils/epg";

export default {
  data() {
    return {
      isHome: true,
      isHomeTab: true,
      ispurchaseFee: false,
      routerName: "",
      positionX: 0,
      positionY: 0,
      userId: "",
      temp: "",
      curHref: ""
    };
  },
  created() {
    let userId = Authentication.CTCGetConfig("UserID"); //获取用户账号
    this.userId = userId;
    if (this.$route.query.code == "fail") {
      this.ispurchaseFee = false;
      this.isHome = false;
      this.routerName = "个人中心";
    } else {
      this.isHome = true;
    }

    let EPGDomain = Authentication.CTCGetConfig("EPGDomain");
    this.temp = EPGDomain.split("://")[1].split("/en/")[0];
  },
  mounted() {
    let tabName =
      this.$store.state.showTabName === ""
        ? "M000"
        : this.$store.state.showTabName;
    let listName =
      this.$store.state.subTabName !== "" ? this.$store.state.subTabName : "";
    this.$service.move(this.$service.pointer);
    if (
      tabName &&
      this.$children[0] &&
      this.$store.state.showOldTabName === ""
    ) {
      this.$children[0].handleClick({ tabCode: tabName });
      if (tabName !== "M000") {
        this.$children[5].showProjects(JSON.parse(listName));
      }
    }
    let that = this;
    let backUrl = location.href;
    this.curHref = getUrlKey("backurl", backUrl);
    document.onkeydown = function(e) {
      if (that.$router.currentRoute.name === "home") {
        that.serviceBack(e);
      } else if (e.keyCode == 8) {
        that.$router.push({
          path: "/home"
        });
      }
    };
  },
  methods: {
    trigTo(path) {
      if (path == "home") {
        this.isHome = true;
        this.$children[0].handleClick({ tabCode: "M000" });
        this.$router.push({ path: "/home" });
      } else {
        this.isHome = false;
        this.$children[0].handleClick({ tabCode: "" });
      }
      if (path == "fee") {
        this.ispurchaseFee = true;
      } else {
        this.ispurchaseFee = false;
      }
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
    move(e) {
      let odiv = e.target; //获取目标元素

      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //绑定元素位置到positionX和positionY上面
        this.positionX = top;
        this.positionY = left;

        //移动当前元素
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    changeHomeContent(tabName) {
      if (tabName == "M000") {
        this.isHomeTab = true;
      } else {
        this.isHomeTab = false;
      }
    },
    serviceBack(event) {
      let e = event || window.event || arguments.callee.caller.arguments[0];
      let keyValue = e.keyCode ? e.keyCode : e.which;
      if (keyValue == 8 || keyValue === "Epgkey.back") {
        this.$confirm("确定要退出小豆派派吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          location.href = this.curHref;
        });
      }
    },
    ...epgMethods
  },
  components: {
    List,
    Tabs,
    Project
  }
};
</script>
<style scoped>
.home {
  width: 95%;
  height: 98%;
  background: url(../static/image/home/home_back.jpg) no-repeat 0 0;
  background-size: 100% 100%;
  padding: 1% 2.5%;
  font-family: "微软雅黑";
  position: relative;
}
.header {
  width: 100%;
  height: 160px;
}
.header.user {
  height: 45px;
}
.header .logo {
  width: 160px;
  height: 100%;
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
  height: 40px;
  float: left;
}
.header .tablist .rightbtns ul {
  height: 60px;
  font-size: 25px;
  font-family: "\5FAE\8F6F\96C5\9ED1";
  float: right;
  margin: 10px 0;
}
.header .tablist .rightbtns ul li {
  float: left;
  margin: 0 10px;
}
li.hd_item.focusEpg {
  color: yellow;
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
.header .tablist .tabs,
.header .tablist .title {
  width: 100%;
  height: 140px;
  line-height: 140px;
  float: left;
}
.header .tablist .title {
  font-size: 45px;
  font-weight: 500;
  font-family: "微软雅黑";
  color: darkblue;
  margin-left: -190px;
}
.header .tablist .title .line {
  font-size: 25px;
  font-weight: 600;
  color: rgb(94, 186, 223);
  padding: 0 10px;
}
.content {
  width: 100%;
  float: left;
  margin-top: -30px;
  height: 540px;
  overflow: auto;
}
.route_content {
  width: calc(100% - 100px);
  height: calc(100% - 220px);
  float: left;
  margin: 0 50px;
  overflow: hidden;
}
.route_content.fee {
  height: calc(100% - 100px);
}
.content .swiper {
  width: 250px;
  height: 100%;
  float: left;
  overflow: auto;
}
.content .list {
  width: 960px;
  height: 100%;
  float: right;
  overflow: auto;
}
.content.home_tab .list {
  width: 100%;
}
.content.home_tab >>> .videoPro {
  height: 230px !important;
}
.content.other_tab .list {
  width: 960px;
}
.pig_icon {
  width: 140px;
  height: 140px;
  background: url(../static/image/home/logo_pig.png) no-repeat 0 0;
  background-size: contain;
  position: absolute;
  bottom: 0;
  right: 0 !important;
  z-index: 99;
  cursor: grab;
}
/* @media (max-width: 1280px) {
  .content.home_tab >>> .videoPro {
    height: 250px !important;
  }
  .content {
    margin-top: -40px;
  }
  .header .tablist .title {
    font-size: 35px;
    margin-left: -180px;
    margin-top: -50px;
    float: left;
  }
  .route_content {
    width: 1100px;
    height: 500px;
    float: left;
    margin: 0 50px;
    overflow: hidden;
    margin-top: -40px;
  }
  .tabCalss >>> .el-tabs__nav-wrap.is-scrollable {
    width: 520px;
  }
} */
</style>
