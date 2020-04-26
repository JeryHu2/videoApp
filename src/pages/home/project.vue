<template>
  <div class="cards">
    <Card @openDetails="openDetails" v-for="item in videoData" :key="item.id" :project="item"></Card>
  </div>
</template>
<script>
import Card from "../../components/card";
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
        img: "/static/details/back.jpg"
      },
      {
        id: "ran_2",
        label: "熊猫笔记 全集",
        img: "/static/details/back.jpg"
      },
      {
        id: "ran_3",
        label: "熊猫笔记 全集",
        img: "/static/details/back.jpg"
      },
      {
        id: "ran_4",
        label: "熊猫笔记 全集",
        img: "/static/details/back.jpg"
      },
      {
        id: "ran_5",
        label: "熊猫笔记 全集",
        img: "/static/details/back.jpg"
      },
      {
        id: "ran_6",
        label: "熊猫笔记 全集",
        img: "/static/details/back.jpg"
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
.cards .videoPro {
  float: left;
  width: 30%;
  margin: 20px 0 0px 20px;
  height: 300px;
}
</style>
