<template>
  <div class="overrow">
    <Card
      class="card_item"
      @openDetails="openDetails"
      v-for="item in showVideoData"
      :key="item.id"
      :project="item"
      @left="left()"
      @right="right()"
      @up="up()"
      @down="down()"
      v-items
    ></Card>
    <el-pagination
      v-items
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="paginationData.currentPage"
      :page-size="paginationData.pageSize"
      background
      layout="total,prev, pager, next"
      :total="paginationData.total"
    ></el-pagination>
  </div>
</template>
<script>
import Card from "../components/card";
import url from "@/api/videoApi.js";
import Qs from "qs";
import { Loading } from "element-ui";
import { epgMethods } from "../utils/epg";

export default {
  data() {
    return {
      videoData: [],
      paginationData: {
        total: 12,
        pageSize: 12,
        currentPage: 1
      },
      showVideoData: []
    };
  },
  mounted() {
    this.showList();
    let el = document.getElementsByClassName("card_item")[0];
    this.$service.move(el);
  },
  methods: {
    openDetails() {},
    handleSizeChange(val) {
      this.paginationData.pageSize = val;
      this.showList();
    },
    handleCurrentChange(val) {
      this.paginationData.currentPage = val;
      this.showList();
    },
    showList() {
      this.showVideoData = [];
      this.getMenuList();
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
      let userId = "yagnxiuyuan";

      if (params) {
        userId = Qs.stringify(params);
      } else {
        userId = Qs.stringify({ userId: userId });
      }
      this.$axios
        .post(url.getCollect, userId)
        .then(res => {
          if (res.data.code == "200" && res.data.data.length > 0) {
            res.data.data.map(o => {
              this.showVideoData.push({
                name: o.name,
                id: o.id,
                img: o.pathPic2,
                showTitle: o.showTitle
              });
            });
            this.paginationData.total = res.data.total_count;
            loadingInstance.close();
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
.overrow {
  overflow: hidden;
  margin: 0 40px;
  height: 100%;
  background: #f5f7fa;
  border-radius: 20px;
  padding-top: 30px;
}
.overrow .videoPro {
  cursor: pointer;
  width: 220px;
  float: left;
  margin: 30px 0 0 45px;
  height: 270px;
}
.el-pagination {
  float: left;
  margin: 50px auto;
  width: 100%;
}
/* @media (max-width: 1280px) {
  .overrow .videoPro {
    cursor: pointer;
    width: 160px;
    float: left;
    margin: 30px 0 0 40px;
    height: 180px;
  }
} */
</style>
