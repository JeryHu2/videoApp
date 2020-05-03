<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tabCalss">
    <el-tab-pane
      v-for="item in tabList"
      :key="item.key"
      :label="item.name"
      :name="item.key"
    >{{ item.name }}}</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: "home",
      tabList: []
    };
  },
  created() {
    this.tabList = [
      { key: "home", name: "首页" },
      { key: "child", name: "亲子园" },
      { key: "exercise", name: "品质养成" },
      { key: "home2", name: "测试栏目1" },
      { key: "home3", name: "测试栏目2" },
      { key: "home4", name: "测试栏目3" },
      { key: "home5", name: "测试栏目4" }
    ];
  },
  methods: {
    handleClick(tab, event) {
      this.$store.commit("changeTabs", tab.name);
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
</style>
