<template lang="html">
  <div class="videos-component">
    <h2 class="videos-component_title">
      Ostatnio dodane videotesty
    </h2>
    <videos-list :videos="videos.slice(0, 10);" />
  </div>
</template>

<script>
import VideosList from "../VideosList";
export default {
  name: "videos-component",
  components: {
    VideosList
  },
  props: ["videos"]
};
</script>

<style lang="scss" scoped>
@import "../../../scss/_variable";

.videos-component {
  &_title {
    font: 600 18px/1.3 $font-primary;
    color: #000;
    padding: 0 0 15px;
    @include media($tablet-big) {
      padding: 0 0 30px;
      font: 600 26px/1.3 $font-primary;
    }
  }
}
</style>
