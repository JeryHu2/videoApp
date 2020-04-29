<template>
  <div class="overrow">
    <Card @openDetails="openDetails" v-for="item in showVideoData" :key="item.id" :project="item"></Card>
    <el-pagination
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
  created() {
    this.videoData = [
      {
        id: "ran_1",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_2",
        label: "",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_3",
        label: "",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_4",
        label: "",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_5",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_6",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_7",
        label: "",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_8",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_9",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_10",
        label: "",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_11",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_12",
        label: "小猪佩奇 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_13",
        label: "小猪佩奇",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_14",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_15",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_16",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_17",
        label: "",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_18",
        label: "",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_19",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_20",
        label: "",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_121",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_122",
        label: "小猪佩奇 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_123",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_124",
        label: "小猪佩奇 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_125",
        label: "小猪佩奇 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_126",
        label: "小猪佩奇 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_127",
        label: "小猪佩奇 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_128",
        label: "小猪佩奇 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_129",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_1230",
        label: "",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_1221",
        label: "",
        img: "./static/image/user/333.jpg"
      }
    ];
    this.paginationData.total = this.videoData.length;
  },
  mounted() {
    this.showList();
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
      let startIndex = (this.paginationData.currentPage - 1) * 12;
      let endIndex = startIndex + 12;
      let tempData = JSON.parse(JSON.stringify(this.videoData));
      this.showVideoData = tempData.slice(startIndex, endIndex);
    }
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
  width: 12%;
  float: left;
  margin: 2% 0 0 4%;
  height: 220px;
}
.el-pagination {
  float: left;
  margin: 50px auto;
  width: 100%;
}
</style>
