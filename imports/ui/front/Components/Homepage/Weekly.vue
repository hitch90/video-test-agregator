<template lang="html">
  <div class="weekly-component">
    <h2 class="weekly-component_title">
      Najnowsze testy
    </h2>
    <ul class="weekly-component_list">
      <weekly-item class="weekly-component_listItem"
        v-for="(video, index) in videos"
        :video="video"
        :key="video._id"
        v-if="index < 6" />
    </ul>
  </div>
</template>

<script>
import ytDurationFormat from "youtube-duration-format";
import WeeklyItem from "./WeeklyItem";
export default {
  name: "weekly-component",
  props: ["videos"],
  components: { WeeklyItem },
  methods: {
    duration(time) {
      return ytDurationFormat(time);
    }
  }
};
</script>

<style lang="scss">
@import "../../../scss/_variable";

.weekly-component {
  &_title {
    font: 600 18px/1.3 $font-tertiary;
    color: #000;
    margin: 0 0 15px;
    text-transform: capitalize;
    @include media($tablet-big) {
      font: 600 26px/1.3 $font-tertiary;
      margin: 0 0 30px;
    }
  }
  &_list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    grid-row-gap: 15px;
    @include media($tablet-big) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  &_item {
    &Image {
      position: relative;
      margin: 0 0 5px;
      img {
        display: block;
      }
    }
    &Duration {
      position: absolute;
      bottom: 5px;
      left: 5px;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      font: 400 10px/20px $font-secondary;
      padding: 0 5px;
      border-radius: 3px;
    }
    &Subname {
      font: 600 12px/1.3 $font-primary;
      color: #969696;
      margin: 0 0 5px;
      padding: 0 0;
      @include media($tablet-big) {
        font: 600 14px/1.3 $font-primary;
        margin: 0 0 10px;
        padding: 0 10px;
      }
    }
    &Name {
      font: 600 12px/1.3 $font-primary;
      display: block; /* Fallback for non-webkit */
      display: -webkit-box;
      color: #000;
      padding: 0;
      height: 30px;
      margin: 0 auto;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      @include media($tablet-big) {
        font: 600 14px/1.3 $font-primary;
        padding: 0 10px;
        height: 36px;
      }
    }
  }
}
</style>
