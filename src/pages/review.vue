<template>
  <div class="overrow">
    <Card
      @openDetails="openDetails"
      v-for="item in videoData"
      :key="item.id"
      :project="item"
    ></Card>
  </div>
</template>
<script>
import Card from "../components/card";

export default {
  data() {
    return {
      videoData: []
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
      },
      {
        id: "ran_13",
        label: "熊猫笔记 全集",
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
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_18",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_19",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      },
      {
        id: "ran_20",
        label: "熊猫笔记 全集",
        img: "./static/image/user/333.jpg"
      }
    ];
  },
  methods: {
    openDetails() {}
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
}
.overrow .videoPro {
  cursor: pointer;
  width: 12%;
  float: left;
  margin: 2% 0 0 4%;
}
.overrow >>> .videoPro .card_bottom {
  display: none !important;
}
</style>
