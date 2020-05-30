<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tabCalss">
    <el-tab-pane
      v-items
      v-for="item in tabList"
      :key="item.tabCode"
      :label="item.name"
      :name="item.tabCode"
    >{{ item.name }}}</el-tab-pane>
  </el-tabs>
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
          this.tabList = res.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$store.commit("changeTabs", tab.name);
      this.$store.commit("changeOldTabs", tab.name);
      if (tab.name === "M000") {
        this.$store.commit("changeListName", "");
      }

      this.$parent.changeHomeContent(tab.name);
    }
  }
};
</script>
<style scoped>
.tabCalss >>> .el-tabs__header,
.tabCalss >>> .el-tabs__nav,
.tabCalss >>> .el-tabs__item {
  border: 0 !important;
}
.tabCalss >>> .el-tabs__item {
  font-family: "微软雅黑";
  font-size: 35px;
  color: blue;
  font-weight: bold;
  width: 250px;
  height: 140px;
  line-height: 160px;
}
.tabCalss >>> .el-tabs__content {
  display: none;
}
.tabCalss >>> .el-tabs__nav-scroll {
  margin: 0 60px;
}
.tabCalss >>> .el-tabs__item {
  padding: 0px !important;
}
.tabCalss >>> .el-tabs__item.is-active {
  background: url(../../static/image/home/nav.png) no-repeat 0 0;
  background-size: cover;
}
.tabCalss >>> .el-tabs__nav-next,
.tabCalss >>> .el-tabs__nav-prev {
  font-size: 90px;
  top: 30px;
}
@media (max-width: 1280px) {
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
  }
}
</style>
