<template lang="html">
  <div class="videoWrapper">
    <!-- Copy & Pasted from YouTube -->
    <iframe width="560" height="349" :src="`http://www.youtube.com/embed/${id}?rel=0&hd=1`" frameborder="0" allowfullscreen></iframe>
</div>
</template>

<script>
export default {
  name: "yt-video-component",
  props: ["id"]
};
</script>

<style lang="scss">
.videoWrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
