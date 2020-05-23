<template>
  <div class="videoPro" @click="openDetails" v-items>
    EPGDomain:{{EPGDomain}}
    <el-card>
      <div
        :style="{ backgroundImage: 'url(' + project.img + ')' }"
        class="image"
      ></div>
      <div class="card_bottom clearfix" v-show="project.showTitle != 'false'">
        <el-button type="text" class="button">{{ project.name }}</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ["project","userId","EPGDomain"],
  data() {
    return {};
  },
  methods: {
    openDetails() {
     let EPGDomain =Authentication.CTCGetConfig("EPGDomain");//获取用户EPGDomain
     
      this.$router.push({
        path: "/details",
        query: {
          code: this.project.dramaId ? this.project.dramaId : this.project.id,
          EPGDomain:EPGDomain
        }
      });
      // window.location.href  = `http://125.88.42.126:33200/ACS/vas/verifyuser?SPID=GDIPTV0038&UserID=${this.userId}8&ReturnURL=http://14.18.195.212:10007/#/details?code=D0003&ReturnInfo=null&UserToken=null&ExpiredTime=null&Action=UserTokenRequest`
      // window.location.href  = 'http://125.88.70.16:8082/EPG/jsp/defaultsmchd/en/play/vod_play.jsp?foreignId=02000006000000012014112699000369&authFlag=1&backUrl=http://125.88.70.16:8082/EPG/jsp/defaultsmchd/en/play/vod_play.jsp?foreignId=02000006000000012014112699000369&authFlag=1&backUrl=http://14.18.195.212:10007/#/home'
        
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
.videoPro .el-card:hover {
  border: 5px solid yellow !important;
  box-shadow: 0px 2px 30px yellow !important;
}
</style>
