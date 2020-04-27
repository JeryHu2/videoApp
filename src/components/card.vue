<template>
  <div class="videoPro" @click="openDetails">
    <el-card>
      <img :src="project.img" class="image" />
      <div class="card_bottom clearfix">
        <el-button type="text" class="button">{{ project.label }}</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ["project"],
  data() {
    return {};
  },
  methods: {
    openDetails() {
      this.$router.push({ path: "/details" });
    }
  }
};
</script>
<style>
.videoPro {
  cursor: pointer;
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
  border: 5px solid #000 !important;
  border-radius: 40px !important;
  height: 100%;
  position: relative;
}
.videoPro .el-card:hover {
  border: 5px solid yellow !important;
  box-shadow: 0px 2px 30px yellow !important;
}
</style>
