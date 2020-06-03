<template>
  <ul class="swip_list" ref="listObj">
    <li
      class="list_item"
      v-for="(item,index) in listData"
      @left="left()"
      @right="right()"
      @up="up()"
      @down="down()"
      :key="index"
      v-items
      :class="{ active: item.active }"
      @click="showProjects(item,index)"
    >
      <el-button>{{ item.name }}</el-button>
    </li>
  </ul>
</template>
<script>
import eventBus from "@/utils/eventBus";
import { epgMethods } from "../../utils/epg";
export default {
  data() {
    return {};
  },
  watch: {
    listData(newValue) {
      let subNameObj =
        this.$store.state.subTabName !== ""
          ? JSON.parse(this.$store.state.subTabName)
          : null;
      if (newValue) {
        if (subNameObj !== null) {
          this.showProjects(newValue[subNameObj.index], subNameObj.index);
        } else {
          this.showProjects(newValue[0], 0);
        }
      }
    }
  },
  computed: {
    listData() {
      return this.$store.state.lisData;
    }
  },
  methods: {
    showProjects(obj, i) {
      this.listData.map(o => {
        o.active = false;
        o.index = i;
      });
      if (obj) {
        obj.active = true;
        eventBus.$emit("changeList", obj.length);
        this.$store.commit("changeListName", JSON.stringify(obj));
      }
    },
    ...epgMethods
  }
};
</script>
<style scoped>
ul.swip_list {
  margin: 15px 30px;
}
ul.swip_list li {
  margin: 20px 0;
}
.el-button {
  width: 166px;
  height: 72px;
  font-size: 22px;
  font-weight: 600;
  color: #014bc0;
  font-family: 微软雅黑;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 24px;
}
.el-button:hover,
ul.swip_list li.active button {
  background: url(../../static/image/home/menu_left_on.png) no-repeat 0 0;
  background-size: cover;
  color: yellow;
}
</style>
