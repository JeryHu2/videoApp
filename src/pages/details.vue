<template>
  <div class="details_body">
    <div class="dt_top">
      <div class="img" v-items :style="{ backgroundImage: 'url(' + imgSrc + ')' }"></div>
      <div class="des">
        <h1>{{ actTitle }}</h1>
        <p>{{ description }}</p>
        <button class="open btn" v-items @click="open"></button>
        <button class="purchase btn" @click="trigTo" v-items></button>
        <button class="collect btn" @click="collectVideo" v-items :class="{ active: isCollect }"></button>
      </div>
    </div>
    UserToken:{{UserToken}},
    res:{{res}},
    result:{{result}},
    <div class="dt_bottom">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="item.groupName"
          :name="item.name"
          v-for="(item, index) in listData"
          :key="index"
        >
          <div
            class="cards"
            v-for="(obj,index) in item.groupDetail"
            :key="index"
            @left="left()"
            @right="right()"
            @up="up()"
            @down="down()"
            @click="open(obj)"
            v-items
          >{{ obj.number }} {{obj.name}}</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import eventBus from "@/utils/eventBus";
import url from "@/api/videoApi.js";
import Qs from "qs";
import { Loading } from "element-ui";
import { epgMethods } from "../utils/epg";

export default {
  data() {
    return {
      activeName: "groupName0",
      videoData: {},
      listData: [],
      showVideoData: [],
      actTitle: "",
      description: "",
      imgSrc: "",
      isCollect: false,
      dramaId: "",
      DOMAIN: "",
      temp: "",
      tempimgSrc: "",
      result: ""
    };
  },
  mounted() {
    let UserToken = Authentication.CTCGetConfig("UserToken"); //获取用户Token值
    this.UserToken = UserToken;
    let userId = Authentication.CTCGetConfig("UserID"); //获取用户账号
    this.userId = userId;
    if (this.$route.query.code) {
      this.dramaId = this.$route.query.code;
    } else {
      this.dramaId = "D0001";
    }
    if (this.$route.query.EPGDomain) {
      this.temp = this.$route.query.EPGDomain;
    } else {
      let EPGDomain = Authentication.CTCGetConfig("EPGDomain");
      this.temp = EPGDomain.split("://")[1].split("/en/")[0];
    }
    this.getMenuList();
    let el = document.getElementsByClassName("cards")[0];
    this.$service.move(el);
  },
  methods: {
    getMenuList(params) {
      let loadingInstance = Loading.service({
        text: "请稍等",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".loadingtext")
      });
      this.videoData = {};
      this.listData = [];
      let num = 0;
      let temParams = {
        dramaId: this.dramaId,
        userId: this.$route.query.userId
      };

      if (params) {
        temParams = Qs.stringify(params);
      } else {
        temParams = Qs.stringify(temParams);
      }
      this.$axios
        .post(url.getEpisode, temParams)
        .then(res => {
          loadingInstance.close();
          if (res.data.code == "200" && res.data.data.Episode.length > 0) {
            res.data.data.Episode.map((p, i) => {
              this.listData.push({
                id: i,
                groupName: p.groupName,
                groupDetail: p.groupDetail,
                name: "groupName" + i
              });
            });
            this.description = res.data.data.actor;
            this.actTitle = res.data.data.name;
            this.isCollect = res.data.data.isCollect == "1" ? true : false;
            this.imgSrc = res.data.data.pathPic1;

            this.activeName = this.listData[0].name;
          }
        })
        .catch(err => {
          console.log(err);
          loadingInstance.close();
        });
    },
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
    collectVideo() {
      this.isCollect = !this.isCollect;
      let params = {
        userId: "yagnxiuyuan",
        dramaId: "D001",
        optType: this.isCollect ? "add" : "del"
      };
      params = Qs.stringify(params);
      this.$axios.post(url.addCollect, params).then(res => {
        this.$message({
          message: res.data.massage,
          type: "success"
        });
      });
    },
    trigTo() {
      this.$router.push({
        path: "/user",
        query: {
          code: "fail"
        }
      });
    },
    ...epgMethods,
    open(item) {
      let contentId = "";
      let returnUrl = `${location.host}/#/home`;
      if (item.contentId) {
        contentId = item.contentId;
      } else {
        contentId = this.listData[0].groupDetail[0].contentId;
      }
      let temParams = {
        UserToken: this.UserToken,
        UserID: this.userId
      };
      this.$axios
        .get(
          `${url.serviceAuth}?UserToken=${this.UserToken}&UserID=${this.userId}`
        )
        .then(res => {
          console.log(res);
          this.res = res;
          if (res.data.result == '200') {
            this.result = 200;
            this.ref = `http://${this.temp}/en/play/vod_play.jsp?foreignId=${contentId}&authFlag=2&backUrl=${returnUrl}`;
            window.location.href = this.ref;
          } else if (res.data.result =='504') {
            this.result = 504;
            this.$axio
              .get(
                `http://payment.iptv.gd.cn:38081/ACS/vas/serviceorder?SPID=GDIPTV0038&UserID=${this.userId}&ServiceID=40230&ContentID=${contentId}&ProductID=1000662&UserToken=${this.UserToken}&Action=1&OrderMode=1&ReturnURL=http://14.18.195.212:10021/#/purchaseResult&ContinueType=0`
              )
              .then(result => {
                this.result = result
                console.log("result", result);
                this.$alert(result);
              }).catch(err=>{
                this.$alert(err);
              });
          } else {
            this.result = "qita";
            this.$alert(res.data.massage);
          }
          // switch (res.result) {
          //   case 0:
          //     this.result = 0
          //     this.ref = `http://${this.temp}/en/play/vod_play.jsp?foreignId=${contentId}&authFlag=2&backUrl=${returnUrl}`;
          //     window.location.href = this.ref;
          //     break;
          //   case 504:
          //     // this.$router.push({
          //     //   path: "/purchaseResult"
          //     // });
          //     this.result = 504
          //     this.$axio
          //       .get(
          //         `http://payment.iptv.gd.cn:38081/ACS/vas/serviceorder?SPID=GDIPTV0038&UserID=${this.userId}&ServiceID=40230&ContentID=${contentId}&ProductID=1000662&UserToken=${this.UserToken}&Action=1&OrderMode=1&ReturnURL=http://14.18.195.212:10021/#/purchaseResult&ContinueType=0`
          //       )
          //       .then(result => {
          //         console.log("result", result);
          //       });
          //     // http://payment.iptv.gd.cn:38081/ACS/vas/serviceorder?SPID=GDIPTV0038&UserID=2009121603&ServiceID=40230&ContentID=113&ProductID=1000662&UserToken=0CC531019D68301713436FC65C617C35&Action=1&OrderMode=1&ReturnURL=http://14.18.195.212:10021/#/home&ContinueType=0
          //     break;
          //   default:
          //     this.result = 'qita'
          //     this.$alert(res.message);
          //     break;
          // }
        })
        .catch(err => {
          console.log(err);
          this.err = err;
          loadingInstance.close();
        });
    }
  }
};
</script>
<style scoped>
.details_body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 100px;
  background: url(../static/image/home/home_back.jpg) no-repeat 0 0;
  background-size: 100% 100%;
}
.dt_top {
  height: 360px;
}
.dt_top .img {
  width: 600px;
  height: 330px;
  border-radius: 20px;
  border: 4px solid #333;
  cursor: pointer;
  float: left;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.dt_top .des {
  float: left;
  width: calc(100% - 650px);
  margin-left: 50px;
  height: 100%;
}
.dt_top .des h1 {
  font-size: 40px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 10px;
}
.dt_top .des p {
  font-size: 28px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 80px;
}
.dt_top .des .btn {
  height: 70px;
  margin-right: 50px;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
}
.dt_top .des .btn.open {
  width: 140px;
  background: url(../static/image/details/open.png) no-repeat 0 0;
  background-size: 100% 100%;
}
.dt_top .des .btn.open:hover {
  background: url(../static/image/details/open_active.png) no-repeat 0 0;
  background-size: 100% 100%;
}
.dt_top .des .btn.purchase {
  width: 180px;
  background: url(../static/image/details/purchase.png) no-repeat 0 0;
  background-size: 100% 100%;
}
.dt_top .des .btn.purchase:hover {
  background: url(../static/image/details/purchase_hover.png) no-repeat 0 0;
  background-size: 100% 100%;
}
.dt_top .des .btn.collect {
  width: 140px;
  background: url(../static/image/details/collect.png) no-repeat 0 0;
  background-size: 100% 100%;
}
.dt_top .des .btn.collect:hover,
.dt_top .des .btn.collect.active {
  background: url(../static/image/details/collect_hover.png) no-repeat 0 0;
  background-size: 100% 100%;
}
.dt_bottom >>> .cards {
  width: 350px;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  text-align: center;
  background: rgba(255, 255, 255, 0.6);
  color: #409eff;
  float: left;
  cursor: pointer;
  margin: 20px 80px 20px 0;
  border-radius: 8px;
}
.dt_bottom >>> .cards:hover {
  color: #fff;
  background: #409eff;
}
.dt_bottom >>> .el-tabs__item {
  font-size: 30px !important;
}
.dt_bottom >>> .el-tabs__item.is-active {
  color: #fff;
  background: #409eff;
}
.dt_bottom >>> .el-tabs__nav-wrap::after {
  display: none;
}
.dt_bottom >>> .el-tabs__item {
  padding: 0 20px !important;
}
</style>
