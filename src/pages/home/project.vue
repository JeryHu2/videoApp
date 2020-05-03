<template>
  <div class="cards">
    <Card
      @openDetails="openDetails"
      v-for="item in showVideoData"
      :key="item.id"
      :project="item"
      :class="{'twoPercent':item.length<3,'onePercent':item.length>3,'ishome':tabName == 'home'}"
    ></Card>
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
        let index =
          this.tabIndex > 0
            ? 6 - this.tabIndex
            : this.videoData[this.$store.state.showTabName].length;
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
          length: 4,
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_2",
          label: "小猪 全集",
          length: 2,
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_3",
          label: "福娃系列 全集",
          length: 2,
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_4",
          label: "小猪 全集",
          length: 2,
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_5",
          label: "福娃 全集",
          length: 3,
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_6",
          label: "小猪 全集",
          length: 3,
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_7",
          label: "小猪 全集",
          length: 3,
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_8",
          label: "小猪 全集",
          length: 2,
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_11",
          label: "小猪 全集",
          length: 4,
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_9",
          label: "小猪 全集",
          length: 2,
          img: "./static/image/details/222.jpg"
        },
        {
          id: "ran_10",
          label: "小猪 全集",
          length: 2,
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
        },
        {
          id: "ran_7",
          label: "福娃系列 全集",
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_8",
          label: "小猪 全集",
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_9",
          label: "福娃 全集",
          img: "./static/image/details/111.jpg"
        },
        {
          id: "ran_10",
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
        let index =
          data > 0
            ? 6 - data
            : that.videoData[that.$store.state.showTabName].length - 1;
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
.cards .videoPro.ishome {
  height: 400px;
}
.cards .onePercent.videoPro {
  width: 36%;
}
.cards .twoPercent.videoPro {
  width: 17.5%;
}
</style>
