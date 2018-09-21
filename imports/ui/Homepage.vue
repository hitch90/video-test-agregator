<template>
  <div class="component-homepage">
    <div class="component-homepage_section top">
      <weekly-items :videos="weeklyVideos" class="component-homepage_sectionWeekly" />
      <promo-items :video="promo" class="component-homepage_sectionPromos"/>
    </div>
    <div class="component-homepage_section producers">
      <producers-component :producers="producers" />
    </div>
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
  &_section {
    padding: 0 15px 15px;
    border-bottom: 1px solid #e4e4e4;
    @include media($tablet-big) {
      padding: 50px 0;
    }
    &.top {
      display: flex;
      flex-wrap: wrap;
      @include media($tablet-big) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 50px;
        align-items: center;
      }
    }
    &.producers {
      padding: 15px;
      @include media($tablet-big) {
        padding: 50px 0;
      }
    }
  }
  &_sectionWeekly {
    width: 100%;
    order: 2;
    @include media($tablet-big) {
      width: auto;
      order: 1;
    }
  }
  &_sectionPromos {
    width: 100%;
    order: 1;
    margin: 0 0 15px;
    @include media($tablet-big) {
      width: auto;
      margin: 0;
      order: 2;
    }
  }
}
</style>
