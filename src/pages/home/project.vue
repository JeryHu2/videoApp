<template>
  <div class="cards">
    <Card
      @openDetails="openDetails"
      v-for="item in videoData"
      :key="item.id"
      :project="item"
    ></Card>
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
        label: "福娃系列 全集",
        img: "./static/image/details/111.jpg"
      },
      {
        id: "ran_2",
        label: "小猪 全集",
        img: "./static/image/details/222.jpg"
      },
      {
        id: "ran_3",
        label: "福娃系列 全集",
        img: "./static/image/details/111.jpg"
      },
      {
        id: "ran_4",
        label: "小猪 全集",
        img: "./static/image/details/222.jpg"
      },
      {
        id: "ran_5",
        label: "福娃 全集",
        img: "./static/image/details/111.jpg"
      },
      {
        id: "ran_6",
        label: "小猪 全集",
        img: "./static/image/details/222.jpg"
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
