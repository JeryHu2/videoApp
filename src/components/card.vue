<template>
  <div class="videoPro" @click="openDetails">
    <el-card>
      <img :src="project.img" class="image" />
      <div class="bottom clearfix">
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
.bottom {
  height: 50px;
  line-height: 50px;
  background: rgba(0, 0, 0, 0.6);
}

.button {
  padding: 0;
  color: #fff;
  font-size: 20px;
}

.image {
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
.el-card__body {
  padding: 0px;
}
.el-card {
  border: 5px solid #000;
  border-radius: 40px;
}
.el-card:hover {
  border: 5px solid yellow;
  box-shadow: 0px 2px 30px yellow;
  border-radius: 40px;
}
</style>
