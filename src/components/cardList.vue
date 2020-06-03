<template>
  <div>
    <div class="header">
      <span class="line">——</span>
      <span class="title">{{ project.name }}</span>
      <span class="line">——</span>
    </div>
    <div
      class="videoPro"
      @click="openDetails"
      @left="left()"
      @right="right()"
      @up="up()"
      @down="down()"
      v-for="item in project.list"
      :key="item.id"
      v-items
    >
      <el-card>
        <img :src="item.img" class="image" />
      </el-card>
    </div>
  </div>
</template>
<script>
import { epgMethods } from "../utils/epg";
export default {
  props: ["project"],
  data() {
    return {};
  },
  mounted() {
    let el = document.getElementsByClassName("videoPro")[0];
    this.$service.move(el);
  },
  methods: {
    openDetails() {
      this.$router.push({ path: "/details" });
    },
    ...epgMethods
  }
};
</script>
<style>
.videoPro {
  cursor: pointer;
  width: 25%;
  float: left;
  margin: 0 4%;
  height: 155px;
}
.header {
  font-size: 24px;
  margin-bottom: 30px;
}
.header .title {
  font-weight: 600;
}
.card_bottom {
  height: 50px;
  line-height: 50px;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0px;
  width: 100%;
  left: 0;
}

.videoPro .button {
  padding: 0;
  color: #fff;
  font-size: 20px;
}

.videoPro .image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.videoPro .el-card__body {
  padding: 0px !important;
}
.videoPro .el-card {
  border: 2px solid #000 !important;
  border-radius: 20px !important;
  height: 100%;
  position: relative;
}
.videoPro .el-card:hover,
.focusEpg .el-card {
  border: 2px solid yellow !important;
  box-shadow: 0px 2px 30px yellow !important;
}
/* @media (max-width: 1280px) {
  .videoPro {
    cursor: pointer;
    width: 25%;
    float: left;
    margin: 0 4%;
    height: 130px;
  }
} */
</style>
