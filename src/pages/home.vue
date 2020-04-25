<template>
  <div style="overflow:hidden">
    <div class="home">
      <div class="header">
        <div class="logo"></div>
        <div class="tablist">
          <div class="rightbtns">
            <ul>
              <li>
                <i class="user_logo"></i>
                <label @click="trigTo('user')">个人中心</label>
              </li>
              <li>
                <i class="eye_logo"></i>
                <label @click="trigTo('review')">浏览历史</label>
              </li>
              <li>
                <i class="star_logo"></i>
                <label @click="trigTo('collection')">收藏记录</label>
              </li>
            </ul>
          </div>
          <div class="tabs">
            <Tabs></Tabs>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="swiper">
          <List></List>
        </div>
        <div class="list">
          <Project></Project>
          <div class="pig_icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import List from "./home/list";
import Tabs from "./home/tabs";
import Project from "./home/project";

export default {
  data() {
    return {};
  },
  methods: {
    trigTo(route) {
      this.$router.push({ path: `/${route}` });
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
  background: url(/static/home/home_back.jpg) no-repeat 0 0;
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
  background: url(/static/home/logo.png) no-repeat 40px 0;
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
  background: url(/static/home/logo_man.png) no-repeat center;
  background-size: 100% 100%;
}
.header .tablist .rightbtns ul li i.eye_logo {
  background: url(/static/home/logo_view.png) no-repeat center;
  background-size: 100% 100%;
}
.header .tablist .rightbtns ul li i.star_logo {
  background: url(/static/home/logo_star.png) no-repeat center;
  background-size: 100% 100%;
}
.header .tablist .tabs {
  width: 100%;
  height: 140px;
  line-height: 140px;
}
.content {
  width: 100%;
  height: calc(100% - 200px);
  position: relative;
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
  background: url(/static/home/logo_pig.png) no-repeat 0 0;
  position: absolute;
  bottom: -40px;
  right: -40px;
  z-index: 99;
}
</style>
