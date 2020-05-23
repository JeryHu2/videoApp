<template>
  <div style="overflow:hidden">
    <div class="home">
      <div class="header" :class="{ user: ispurchaseFee }">
        <div class="logo" @click="trigTo('home')" v-show="!ispurchaseFee" v-items></div>tempimgSrc:
        <iframe
          :src="tempimgSrc"
          width="500"
          height="300"
          id="iframe"
          style="background: aliceblue;"
        ></iframe>
        ref:{{ref}}
        <div class="tablist">
          <div class="rightbtns">
            <ul>
              <router-link :to="{ name: 'user' }" tag="li" @click.native="trigTo('user')">
                <i class="user_logo"></i>
                <label>个人中心</label>
                userId:{{userId}}
              </router-link>
              <router-link :to="{ name: 'review' }" tag="li" @click.native="trigTo('review')">
                <i class="eye_logo"></i>
                <label>浏览历史</label>

                <!-- DOMAIN2:{{DOMAIN2}} -->
              </router-link>
              <router-link
                :to="{ name: 'collection' }"
                tag="li"
                @click.native="trigTo('collection')"
              >
                <i class="star_logo"></i>
                <label>收藏记录</label>
              </router-link>
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
      <!-- temp:{{temp}},
      temp1:{{temp1}},
      temp2:{{temp2}},-->
      <div class="content home_tab" v-show="isHomeTab && isHome">
        <div class="list">
          <Project :userId="userId" :EPGDomain="temp"></Project>
        </div>
      </div>
      <div class="content other_tab" v-show="!isHomeTab && isHome">
        <div class="swiper">
          <List></List>
        </div>
        <div class="list" ref="videoList">
          <Project :userId="userId" :EPGDomain="temp"></Project>
        </div>
      </div>
      <div class="route_content" v-show="!isHome" :class="{ fee: ispurchaseFee }">
        <router-view></router-view>
      </div>
      <div class="pig_icon" @mousedown="move" v-show="isHome"></div>
    </div>
  </div>
</template>
<script>
import List from "./home/list";
import Tabs from "./home/tabs";
import Project from "./home/project";

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
      tempimgSrc: "",
      ref: ""
    };
  },
  created() {
    let userId = Authentication.CTCGetConfig("UserID"); //获取用户账号
    // // let UserTokenRequest= http://125.88.42.126:33200/ACS/vas/verifyuser?SPID=GDIPTV0038&UserID=075545452068&ReturnURL=http://14.18.195.212:10007/#/details?code=D0003&ReturnInfo=null&UserToken=null&ExpiredTime=null&Action=UserTokenRequest
    this.userId = userId;
    console.log("userId", userId);
    if (this.$route.query.code == "fail") {
      this.ispurchaseFee = false;
      this.isHome = false;
      this.routerName = "个人中心";
    } else {
      this.isHome = true;
    }

    let EPGDomain = Authentication.CTCGetConfig("EPGDomain");
    this.temp = EPGDomain.split("://")[1].split("/en/")[0];
    this.ref = `http://${this.temp}/en/play/vod_play.jsp?foreignId=99100000012020032616152207399851&authFlag=2&backUrl=http://14.18.195.212:10007/#/home`;
    //  this.tempimgSrc = `http://${this.temp}/en/play/vod_play.jsp?foreignId=99100000012020032616152207399851&authFlag=2&backUrl=http://14.18.195.212:10007/#/home`;
    this.tempimgSrc = "wwww.baidu.com";
    // alert("domain2":DOMAIN2)
    // alert("domain1":DOMAIN1)
    // alert("domain3":DOMAIN)
  },
  mounted() {
    // this.temp = `${domain}`
    // this.temp1 = window.location
    // this.temp2 = window
    let tabName =
      this.$store.state.showTabName === ""
        ? "M000"
        : this.$store.state.showTabName;
    let listName =
      this.$store.state.subTabName !== "" ? this.$store.state.subTabName : "";

    if (
      tabName &&
      this.$children[3] &&
      this.$store.state.showOldTabName === ""
    ) {
      this.$children[3].handleClick({ name: tabName });
      if (tabName !== "M000") {
        this.$children[5].showProjects(JSON.parse(listName));
      }
    }
  },
  methods: {
    trigTo(path) {
      if (path == "home") {
        this.isHome = true;
        this.$children[3].handleClick({ name: "M000" });
        this.$router.push({ path: "/home" });
      } else {
        this.isHome = false;
        this.$children[3].handleClick({ name: "" });
      }
      if (path == "fee") {
        this.ispurchaseFee = true;
      } else {
        this.ispurchaseFee = false;
      }
      switch (path) {
        case "user":
          this.$children[6].purchaseFee = false;
          this.routerName = "个人中心";
          break;
        case "review":
          this.routerName = "浏览历史";
          break;
        case "collection":
          this.routerName = "收藏记录";
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
    }
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
  width: 100%;
  height: 100vh;
  background: url(../static/image/home/home_back.jpg) no-repeat 0 0;
  background-size: 100% 100%;
  padding: 30px 50px;
  font-family: "微软雅黑";
  position: relative;
}
.header {
  width: 100%;
  height: 200px;
}
.header.user {
  height: 45px;
}
.header .logo {
  width: 200px;
  height: 100%;
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
  height: 60px;
}
.header .tablist .rightbtns ul {
  height: 60px;
  line-height: 60px;
  font-size: 28px;
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
.header .tablist .tabs,
.header .tablist .title {
  width: 100%;
  height: 140px;
  line-height: 140px;
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
  height: calc(100% - 240px);
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
  width: 400px;
  height: 100%;
  float: left;
  overflow: auto;
}
.content .list {
  width: calc(100% - 400px);
  height: 100%;
  float: right;
  overflow: auto;
}
.content.home_tab .list {
  width: 100%;
}
.content.home_tab >>> .videoPro {
  height: 400px !important;
}
.content.other_tab .list {
  width: calc(100% - 400px);
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
</style>
