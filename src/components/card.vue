<template>
  <div class="videoPro" @click="openDetails" v-items>
    <el-card>
      <div :style="{ backgroundImage: 'url(' + project.img + ')' }" class="image"></div>
      <div class="card_bottom clearfix" v-show="project.showTitle != 'false'">
        <el-button type="text" class="button">{{ project.name }}</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import url from "@/api/videoApi.js";
export default {
  props: ["project", "userId", "EPGDomain"],
  data() {
    return {};
  },
  mounted() {
    this.EPGDomain = Authentication.CTCGetConfig("EPGDomain"); //获取用户EPGDomain
  },
  methods: {
    openDetails() {
      this.$router.push({
        path: "/details",
        query: {
          code: this.project.dramaId ? this.project.dramaId : this.project.id,
          EPGDomain: this.EPGDomain,
          userId: this.userId
        }
      });
      this.$store.commit("changeOldTabs", "");
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
  font-size: 35px;
  line-height: 50px;
}
.videoPro .el-card__body {
  height: 100%;
}
.videoPro .image {
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  display: block;
  background-repeat: no-repeat;
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
.videoPro .el-card:hover,
.focusEpg .el-card {
  border: 5px solid yellow !important;
  box-shadow: 0px 2px 30px yellow !important;
}
@media (max-width: 1280px) {
  .videoPro .el-card {
    border-radius: 18px !important;
  }
}
</style>
