<template>
  <ul class="tabCalss">
    <li
      v-for="item in tabList"
      :key="item.tabCode"
      :class="{'is-active':activeName === item.tabCode}"
      :name="item.tabCode"
      v-items="item.epgConfig"
      :ref="item.tabCode+'Tab'"
      class="tab_item"
      @click="handleClick(item,$event)"
    >{{ item.name }}</li>
  </ul>
</template>
<script>
import url from "@/api/videoApi.js";

export default {
  data() {
    return {
      activeName: "M000",
      tabList: []
    };
  },
  mounted() {
    this.$axios
      .post(url.getMenu)
      .then(res => {
        if (res.data.code == "200" && res.data.data.length > 0) {
          res.data.data[0].epgConfig = { default: true };
          this.tabList = res.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.$service.move(this.$service.pointer);
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.tabCode;
      this.$store.commit("changeTabs", tab.tabCode);
      this.$store.commit("changeOldTabs", tab.tabCode);
      if (tab.tabCode === "M000") {
        this.$store.commit("changeListName", "");
      }

      this.$parent.changeHomeContent(tab.tabCode);
    }
  }
};
</script>
<style scoped>
.tabCalss li {
  font-family: "\5FAE\8F6F\96C5\9ED1";
  font-size: 25px;
  color: blue;
  font-weight: bold;
  width: 180px;
  height: 90px;
  line-height: 110px;
  float: left;
  cursor: pointer;
}
li.tab_item.focusEpg {
  color: yellow;
}
.tabCalss li.is-active {
  background: url(../../static/image/home/nav.png) no-repeat 0 0;
  background-size: cover;
}
/* @media (max-width: 1280px) {
  .tabCalss >>> .el-tabs__item {
    font-family: "微软雅黑";
    font-size: 20px;
    color: blue;
    font-weight: bold;
    width: 150px;
    height: 100px;
    line-height: 110px;
  }
  .tabCalss >>> .el-tabs__nav-next,
  .tabCalss >>> .el-tabs__nav-prev {
    font-size: 40px;
    top: 30px;
    display: none;
  }
  .tabCalss >>> .el-tabs__nav-scroll {
    margin: 0;
  }
} */
</style>
