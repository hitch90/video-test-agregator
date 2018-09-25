<template lang="html">
  <div class="videos-list-component">
    <h2 class="videos-list-component_title" v-if="header" v-html="header"></h2>
    <ul class="videos-list-component_list" :class="`is-${items}`">
      <li class="videos-list-component_item" v-for="video in videos" :key="video._id">
        <router-link :to="{ name: 'VideoPage', params: { id: video._id } }">
          <div class="videos-list-component_image">
            <img :src="video.photo" :alt="video.name" />
            <span class="videos-list-component_duration">{{ duration(video.duration) }}</span>
            <span class="videos-list-component_channelPhoto"><img :src="video.channel.photo" /></span>
          </div>
          <p class="videos-list-component_channel">
            {{ video.channel.name }}
          </p>
          <p class="videos-list-component_name">
            {{ video.name }}
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ytDurationFormat from "youtube-duration-format";

export default {
  name: "videos-list-component",
  props: ["videos", "header", "items"],
  methods: {
    duration(time) {
      return ytDurationFormat(time);
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/_variable";

.videos-list-component {
  &_title {
    font: 600 18px/1.3 $font-primary;
    color: #000;
    padding: 0 0 15px;
    @include media($tablet-big) {
      font: 600 26px/1.3 $font-primary;

      padding: 0 0 30px;
    }
    span {
      font-weight: 400;
    }
  }
  &_list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    @include media($tablet-big) {
      grid-template-columns: repeat(5, 1fr);
      grid-column-gap: 30px;
      grid-row-gap: 30px;
    }
    &.is-3 {
      @include media($tablet-big) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    &.is-2 {
      @include media($tablet-big) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  &_image {
    position: relative;
    img {
      margin: 0;
      display: block;
      filter: grayscale(0);
      transition: all 0.5s ease;
    }
  }
  &_duration {
    position: absolute;
    bottom: 5px;
    left: 5px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 3px;
    padding: 3px;
  }
  &_channel {
    color: #969696;
    font: 600 14px/1.3 $font-primary;
    margin: 5px 0 10px;
    padding: 0 5px;
  }
  &_channelPhoto {
    position: absolute;
    bottom: -25px;
    right: 15px;
    width: 50px;
    height: 50px;
    border: 3px solid #fff;
    border-radius: 50%;
    img {
      border-radius: 50%;
    }
  }
  &_name {
    margin: 0;
    padding: 0 5px;
    height: 35px;
    overflow: hidden;
    @include media($tablet-big) {
      height: auto;
    }
  }
  &_item {
    font: 600 14px/1.3 $font-primary;
    color: #000;
    a {
      color: #000;
      display: block;
      &:hover {
        color: #969696;
        img {
          filter: grayscale(100%);
          transition: all 0.5s ease;
        }
      }
    }
  }
}
</style>
