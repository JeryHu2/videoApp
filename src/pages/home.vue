<template>
  <div style="overflow:hidden">
    <div class="home">
      <div class="header">
        <div class="logo" @click="trigTo('home')"></div>
        <div class="tablist">
          <div class="rightbtns">
            <ul>
              <router-link
                :to="{ name: 'user' }"
                tag="li"
                @click.native="trigTo('user')"
              >
                <i class="user_logo"></i>
                <label>个人中心</label>
              </router-link>
              <router-link
                :to="{ name: 'review' }"
                tag="li"
                @click.native="trigTo('review')"
              >
                <i class="eye_logo"></i>
                <label>浏览历史</label>
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
          <div class="title" v-show="!isHome">
            <span class="line">——</span>
            {{ routerName }}
            <span class="line">——</span>
          </div>
        </div>
      </div>
      <div class="content" v-show="isHome">
        <div class="swiper">
          <List></List>
        </div>
        <div class="list">
          <Project></Project>
        </div>
      </div>
      <div class="route_content" v-show="!isHome">
        <router-view></router-view>
      </div>
    </div>
    <div class="pig_icon" @mousedown="move" v-show="isHome"></div>
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
      routerName: "",
      positionX: 0,
      positionY: 0
    };
  },
  methods: {
    trigTo(path) {
      if (path == "home") {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
      switch (path) {
        case "user":
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
  padding: 30px;
  font-family: "微软雅黑";
}
.header {
  width: 100%;
  height: 200px;
}
.header .logo {
  width: 400px;
  height: 100%;
  float: left;
  cursor: pointer;
  background: url(../static/image/home/logo.png) no-repeat 40px 0;
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
  font-size: 18px;
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
  font-size: 40px;
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
  height: calc(100% - 200px);
  position: relative;
}
.route_content {
  width: calc(100% - 100px);
  height: calc(100% - 250px);
  float: left;
  margin: 50px;
  overflow: hidden;
}
.content .swiper {
  width: 400px;
  height: 100%;
  float: left;
}
.content .list {
  width: calc(100% - 400px);
  height: 100%;
  float: right;
}
.pig_icon {
  width: 200px;
  height: 200px;
  background: url(../static/image/home/logo_pig.png) no-repeat 0 0;
  position: absolute;
  bottom: -40px;
  right: -40px;
  z-index: 99;
  cursor: grab;
}
</style>
