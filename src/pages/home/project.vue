<template>
  <div class="cards">
    <Card
      @openDetails="openDetails"
      v-for="item in showVideoData"
      :key="item.id"
      :project="item"
      @left="left()"
      @right="right()"
      @up="up()"
      @down="down()"
      :userId="userId"
      :EPGDomain="EPGDomain"
      v-items="item.epgConfig"
      class="pro_item"
      :class="{
        twoPercent: item.length < 3,
        onePercent: item.length > 3,
        ishome: tabName == 'home'
      }"
    ></Card>
  </div>
</template>
<script>
import Card from "../../components/card";
import eventBus from "@/utils/eventBus";
import url from "@/api/videoApi.js";
import Qs from "qs";
import { Loading } from "element-ui";
import { epgMethods } from "../../utils/epg";

export default {
  data() {
    return {
      videoData: {},
      listData: [],
      showVideoData: [],
      showNewVideo: false
    };
  },
  props: ["userId", "EPGDomain"],
  watch: {
    tabName(newValue) {
      if (newValue) {
        this.tabObj = newValue;
        let params = {
          menuId: newValue
        };
        this.showVideoData = [];
        this.getMenuList(params);
      }
    },
    oldTabName(newValue) {
      if (newValue !== "" && newValue) {
        this.tabObj = newValue;
        let params = {
          menuId: newValue
        };
        this.showVideoData = [];
        this.getMenuList(params);
      }
    }
  },
  mounted() {
    this.showListProj();
    this.$service.move(this.$service.pointer);
  },
  computed: {
    tabName() {
      return this.$store.state.showTabName;
    },
    oldTabName() {
      return this.$store.state.showOldTabName;
    }
  },
  methods: {
    openDetails() {},
    showListProj() {
      let that = this;
      eventBus.$on("changeList", data => {
        if (that.$parent.$refs.videoList !== undefined) {
          that.$parent.$refs.videoList.scrollTop = 0;
        }
        let tempData = JSON.parse(JSON.stringify(that.videoData));
        that.showVideoData = [];
        if (that.videoData[that.$store.state.showTabName]) {
          that.showVideoData = tempData[that.$store.state.showTabName].slice(
            data[0],
            data[1]
          );
        }
      });
    },
    getMenuList(params) {
      let loadingInstance = Loading.service({
        text: "请稍等",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".loadingtext")
      });
      this.videoData = {};
      this.listData = [];
      let num = 0;
      let menuId = "M000";

      if (params.menuId) {
        menuId = Qs.stringify(params);
      } else {
        menuId = Qs.stringify(this.tabName);
      }
      this.$axios
        .post(url.getDramaAndVideo, menuId)
        .then(res => {
          loadingInstance.close();
          if (res.data.code == "200" && res.data.data.length > 0) {
            this.videoData[this.tabName] = [];
            res.data.data.map(item => {
              if (this.$store.state.showTabName == "M000") {
                if (item.widgets.length > 3) {
                  item.widgets.map((o, i) => {
                    this.videoData[this.tabName].push({
                      id: o.id,
                      name: o.name,
                      img: i == 0 ? o.pathPic1 : o.pathPic2,
                      length: i == 0 ? 4 : 2,
                      showTitle: item.showTitle
                    });
                  });
                } else {
                  item.widgets.map((o, i) => {
                    this.videoData[this.tabName].push({
                      id: o.id,
                      name: o.name,
                      img: o.pathPic1,
                      showTitle: item.showTitle
                    });
                  });
                }
              } else {
                if (item.widgets.length > 0) {
                  item.widgets.map((o, i) => {
                    this.videoData[this.tabName].push({
                      id: o.id,
                      name: o.name,
                      img: o.pathPic1,
                      dramaId: o.dramaId,
                      showTitle: item.showTitle
                    });
                  });
                  num += item.widgets.length;
                  this.listData.push({
                    id: item.id,
                    name: item.name,
                    length: [
                      num - item.widgets.length,
                      item.widgets.length - 1 + num
                    ],
                    active: false
                  });
                }
              }
            });
            this.$store.commit("changeListData", this.listData);
            this.videoData[this.tabName][0].epgConfig = { default: true };
            this.showVideoData = this.videoData[this.tabName];
          }
        })
        .catch(err => {
          console.log(err);
          loadingInstance.close();
        });
    },
    ...epgMethods
  },
  components: {
    Card
  }
};
</script>
<style scoped>
.cards .videoPro {
  float: left;
  width: 30%;
  margin: 30px 0 0 30px;
  height: 200px;
  border: none !important;
}
.cards .videoPro.ishome {
  height: 400px;
}
.cards .onePercent.videoPro {
  width: 40.5%;
}
.cards .twoPercent.videoPro {
  width: 15.5%;
}
/* @media (max-width: 1280px) {
  .cards .videoPro {
    width: 29%;
  }
  .cards .videoPro.ishome {
    height: 250px;
  }
  .cards .onePercent.videoPro {
    width: 33%;
  }
} */
</style>
