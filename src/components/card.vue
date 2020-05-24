<template>
  <div class="videoPro" @click="openDetails" v-items>
    12res:{{res}}
    err:{{err}}
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
    return {
      res: "",
      err: "",
      UserToken:""
    };
  },
  mounted() {
    this.EPGDomain = Authentication.CTCGetConfig("EPGDomain"); //获取用户EPGDomain
    // this.checkUser();
    // let SPID = 350000000040;
    // let userId = Authentication.CTCGetConfig("UserID"); //获取用户账号
    // let returnUrl = `${location.host}/#/details?code=D0003`;
    // let ReturnInfo = null;
    // let UserToken = null;
    // let ExpiredTime = null;
    // let Action = UserTokenRequest;
    // this.$axios
    //   .get(
    //     `http://125.88.42.126:33200/ACS/vas/verifyuser?SPID=350000000040&UserID=${userId}&ReturnURL=${returnUrl}&ReturnInfo=null&UserToken=null&ExpiredTime=null&Action=UserTokenRequest`
    //   )
    //   .then(res => {
    //     console.log(res);
    //     this.res = res;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.err = err;
    //     loadingInstance.close();
    //   });
  },
  methods: {
    checkUser() {
      let SPID = 350000000040;
      let userId = Authentication.CTCGetConfig("UserID"); //获取用户账号
      let returnUrl = `${location.host}/#/details?code=D0003`;
      let ReturnInfo = null;
      let UserToken = null;
      let ExpiredTime = null;
      let Action = UserTokenRequest;
      this.$axios
        .get(
          `http://125.88.42.126:33200/ACS/vas/verifyuser?SPID=350000000040&UserID=${userId}&ReturnURL=${returnUrl}&ReturnInfo=null&UserToken=null&ExpiredTime=null&Action=UserTokenRequest`
        )
        .then(res => {
          console.log(res);
          this.res = res;
          this.UserToken = res.UserToken;
        })
        .catch(err => {
          console.log(err);
          this.err = err;
          loadingInstance.close();
        });
    },
    updateUserToken() {
      let SPID = 350000000040;
      let userId = Authentication.CTCGetConfig("UserID"); //获取用户账号
      let returnUrl = `${location.host}/#/details?code=D0003`;
      let ReturnInfo = null;
      let UserToken = null;
      let ExpiredTime = null;
      let Action = UserTokenRequest;
       let temParams = {
        DramaId: this.project.dramaId,
        UserID: tuserId,
        OldUserToken:this.UserToken
      };
      this.$axios
        .get(url.updateToken,temParams)
        .then(res => {
          console.log(res);
          this.res = res;
        })
        .catch(err => {
          console.log(err);
          this.err = err;
          loadingInstance.close();
        });
    },
    openDetails() {
      let SPID = 350000000040;
      let userId = Authentication.CTCGetConfig("UserID"); //获取用户账号
      let returnUrl = `${location.host}/#/details?code=D0003`;
      let ReturnInfo = null;
      let UserToken = null;
      let ExpiredTime = null;
      let Action = UserTokenRequest;
      let temParams = {
        DramaId: this.project.dramaId,
        UserID: tuserId
      };
      this.$axios
        .get(url.checkUser,temParams)
        .then(res => {
          console.log(res);
          this.res = res;
          this.UserToken = res.UserToken;
          this.$router.push({
            path: "/details",
            query: {
              code: this.project.dramaId
                ? this.project.dramaId
                : this.project.id,
              EPGDomain: this.EPGDomain,
              userId: this.userId // '075545452068'
            }
          });
        })
        .catch(err => {
          console.log(err);
          this.err = err;
          loadingInstance.close();
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
.videoPro .el-card:hover {
  border: 5px solid yellow !important;
  box-shadow: 0px 2px 30px yellow !important;
}
</style>
