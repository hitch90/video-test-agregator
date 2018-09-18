<template>
  <div class="component-homepage">
    <div class="component-homepage_section top">
      <weekly-items :videos="weeklyVideos" class="component-homepage_sectionWeekly" />
      <promo-items :video="promo" class="component-homepage_sectionPromos"/>
    </div>
    <div class="component-homepage_section producers">
      <producers-component :producers="producers" />
    </div>
    <!-- <video-item v-for="video in videos" :video="video" :key="video._id" /> -->

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VideoItem from "./front/Components/Video";
import WeeklyItems from "./front/Components/Homepage/Weekly";
import PromoItems from "./front/Components/Homepage/Promo";
import ProducersComponent from "./front/Components/Homepage/Producers";
export default {
  name: "homepage",
  computed: {
    ...mapGetters({
      langs: "langVars"
    })
  },
  components: {
    VideoItem,
    WeeklyItems,
    PromoItems,
    ProducersComponent
  },
  data() {
    return {
      videos: null,
      weeklyVideos: null,
      promo: null,
      producers: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      Meteor.call("videos.all", (error, result) => {
        this.videos = result;
      });
      Meteor.call("videos.weekly", (error, result) => {
        this.weeklyVideos = result;
      });
      Meteor.call("videos.promo", (error, result) => {
        this.promo = result;
      });
      Meteor.call("producers.all", (error, result) => {
        this.producers = result;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./scss/_variable";
@import "./scss/_colors";
.component-homepage {
  margin: 0 auto;
  border-radius: 8px;
  &_section {
    padding: 50px 0;
    border-bottom: 1px solid #e4e4e4;
    &.top {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 50px;
      align-items: center;
    }
  }
}
</style>
