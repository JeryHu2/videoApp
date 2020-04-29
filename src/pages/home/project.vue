<template>
  <div class="cards">
    <Card @openDetails="openDetails" v-for="item in showVideoData" :key="item.id" :project="item"></Card>
  </div>
</template>
<script>
import Card from "../../components/card";
import eventBus from "@/utils/eventBus";
export default {
  data() {
    return {
      videoData: [],
      showVideoData: [],
      tabIndex: 0
    };
  },
  watch: {
    tabName(newValue) {
      if (newValue) {
        this.tabObj = newValue;
        let index = 6 - this.tabIndex;
        this.showVideoData = this.videoData[newValue].slice(0, index);
      }
    }
  },
  created() {
    this.videoData = {
      home: [
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
      ],
      child: [
        {
          id: "ran_1",
          label: "福娃系列2222 全集",
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_2",
          label: "小猪 全集",
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_3",
          label: "福娃系列 全集",
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_4",
          label: "小猪 全集",
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_5",
          label: "福娃 全集",
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_6",
          label: "小猪 全集",
          img: "./static/image/details/111.jpg"
        }
      ],
      exercise: [
        {
          id: "ran_1",
          label: "福娃系列3333 全集",
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_2",
          label: "小猪 全集",
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_3",
          label: "福娃系列 全集",
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_4",
          label: "小猪 全集",
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_5",
          label: "福娃 全集",
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_6",
          label: "小猪 全集",
          img: "./static/image/details/222.jpg"
        }
      ],
      home2: [
        {
          id: "ran_1",
          label: "福娃系列4444 全集",
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_2",
          label: "小猪 全集",
          img: "./static/image/details/111.jpg"
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
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_6",
          label: "小猪 全集",
          img: "./static/image/details/222.jpg"
        }
      ],
      home3: [
        {
          id: "ran_1",
          label: "福娃系列5555 全集",
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_2",
          label: "小猪 全集",
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_3",
          label: "福娃系列 全集",
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_4",
          label: "小猪 全集",
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_5",
          label: "福娃 全集",
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_6",
          label: "小猪 全集",
          img: "./static/image/details/111.jpg"
        }
      ],
      home4: [
        {
          id: "ran_1",
          label: "福娃系列6666 全集",
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
      ]
    };
    this.showVideoData = this.videoData.home;
    this.showListProj();
  },
  computed: {
    tabName() {
      return this.$store.state.showTabName;
    }
  },
  methods: {
    openDetails() {},
    showListProj() {
      let that = this;
      eventBus.$on("changeList", data => {
        that.tabIndex = data;
        let index = 6 - data;
        that.showVideoData = that.videoData[
          that.$store.state.showTabName
        ].slice(0, index);
      });
    }
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
