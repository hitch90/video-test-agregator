<template lang="html">
  <div class="video-item">
    {{ video.name }}
  </div>
</template>

<script>
export default {
  name: "video-item-component",
  props: ["video"],
  components: {}
};
</script>

<style lang="scss">
</style>
