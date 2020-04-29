<template>
  <ul class="swip_list" ref="listObj">
    <li
      v-for="item in listData"
      :key="item.id"
      :class="{ active: item.active }"
      @click="showProjects(item)"
    >
      <el-button>{{ item.name }}</el-button>
    </li>
  </ul>
</template>
<script>
import eventBus from "@/utils/eventBus";
export default {
  data() {
    return {
      listData: [
        {
          id: 0,
          name: "自信与勇敢",
          active: true
        },
        {
          id: 1,
          name: "习惯与坚持",
          active: false
        },
        {
          id: 2,
          name: "情绪与控制",
          active: false
        },
        {
          id: 3,
          name: "责任与诚信",
          active: false
        },
        {
          id: 4,
          name: "勤奋与机智",
          active: false
        },
        {
          id: 5,
          name: "创意活动",
          active: false
        }
      ]
    };
  },
  methods: {
    showProjects(obj) {
      this.listData.map(o => {
        o.active = false;
      });
      obj.active = true;
      eventBus.$emit("changeList", obj.id);
    }
  }
};
</script>
<style scoped>
ul.swip_list {
  margin: 60px;
}
ul.swip_list li {
  margin: 20px 0;
}
.el-button {
  width: 200px;
  height: 70px;
  font-size: 25px;
  font-weight: 600;
  color: #014bc0;
  font-family: 微软雅黑;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
}
.el-button:hover,
ul.swip_list li.active button {
  background: url(../../static/image/home/menu_left_on.png) no-repeat 0 0;
  background-size: cover;
  color: yellow;
}
</style>
