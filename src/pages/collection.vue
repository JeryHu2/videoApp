<template>
  <div class="overrow">
    <Card
      @openDetails="openDetails"
      v-for="item in videoData"
      :key="item.id"
      :project="item"
    ></Card>
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
      }
    };
  },
  mounted() {
    this.videoData = [
      {
        id: "ran_1",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_2",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_3",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_4",
        label: "熊猫笔记 全集",
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
        label: "熊猫笔记 全集",
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
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_11",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_12",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      }
    ];
  },
  methods: {
    openDetails() {},
    handleSizeChange(val) {
      this.paginationData.pageSize = val;
    },
    handleCurrentChange(val) {
      this.paginationData.currentPage = val;
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
.overrow >>> .videoPro .card_bottom {
  display: none !important;
}
</style>
