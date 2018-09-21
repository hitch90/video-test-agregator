<template lang="html">
  <div class="promo-component" v-if="video">
    <router-link :to="{ name: 'VideoPage', params: { id: video._id} }" class="video-component">
      <div class="video-component_image">
        <img :src="video.photo" alt="Placeholder image">
        <span class="video-component_channelImg">
          <img :src="video.channel.photo" :alt="video.channel.name" />
        </span>
        <span class="video-component_duration">
          {{ duration(video.duration) }}
        </span>
      </div>
      <div class="video-component_content">
        <h3 class="video-component_channelName">
          {{ video.channel.name }}
        </h3>
        <p class="video-component_name">{{ video.name }}</p>
        <div class="video-component_desc" v-html="video.description.substr(0, 360) + '...'" />
      </div>
    </router-link>
  </div>
</template>

<script>
import ytDurationFormat from "youtube-duration-format";

export default {
  name: "promo-component",
  props: ["video"],
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    duration(time) {
      return ytDurationFormat(time);
    }
  }
};
</script>

<style lang="scss">
@import "../../../scss/_variable";
.promo-component {
  overflow: hidden;
  .video-component {
    &:hover {
      .video-component_image {
        img {
          filter: grayscale(100%);
        }
      }
    }
    &_image {
      position: relative;
      img {
        display: block;
        filter: grayscale(0);
        transition: 0.3s;
      }
    }
    &_duration {
      position: absolute;
      bottom: 15px;
      left: 15px;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      font: 400 12px/23px $font-secondary;
      padding: 0 5px;
      border-radius: 3px;
    }
    &_channelImg {
      position: absolute;
      bottom: -25px;
      right: 30px;
      width: 50px;
      height: 50px;
      border: 3px solid #fff;
      border-radius: 50%;
      img {
        border-radius: 50%;
      }
    }
    &_channelName {
      font: 600 14px/1.3 $font-primary;
      color: #969696;
      padding: 10px 15px 20px;
    }
    &_name {
      font: 600 18px/1.3 $font-primary;
      color: #000;
      padding: 0 15px 20px;
    }
    &_desc {
      color: #969696;
      font: 400 14px/1.3 $font-secondary;
      padding: 0 15px;
    }
  }
}
</style>
