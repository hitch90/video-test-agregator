<template lang="html">
  <li class="weekly-component_listItem" v-if="video">
    <router-link :to="{ name: 'VideoPage', params: {id: video._id} }">
      <div class="weekly-component_itemImage">
        <img :src="video.photo" :alt="video.name" />
        <p class="weekly-component_itemDuration">
          {{ duration(video.duration) }}
        </p>
      </div>
      <h4 class="weekly-component_itemSubname">
        {{ video.channel.name }}
      </h4>
      <h3 class="weekly-component_itemName">
        {{ video.name }}
      </h3>
    </router-link>
  </li>
</template>

<script>
import ytDurationFormat from "youtube-duration-format";

export default {
  name: "weekly-item-component",
  props: ["video"],
  methods: {
    duration(time) {
      return ytDurationFormat(time);
    }
  }
};
</script>

<style lang="scss">
</style>
