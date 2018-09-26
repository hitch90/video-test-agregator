<template lang="html">
  <div class="videos-list-component">
    <h2 class="videos-list-component_title" v-if="header" v-html="header"></h2>
    <ul class="videos-list-component_list" :class="`is-${items}`">
      <li class="videos-list-component_item" v-for="(video, index) in videos" :key="video._id" v-if="(showItems && index < showItems) || (!showItems)">
        <router-link :to="{ name: 'VideoPage', params: { id: video._id } }">
          <div class="videos-list-component_image">
            <img :src="video.photo" :alt="video.name" />
            <span class="videos-list-component_duration">{{ duration(video.duration) }}</span>
            <span class="videos-list-component_channelPhoto"><img :src="video.channel.photo" /></span>
            <div class="videos-list-component_clap">
              <span>
                <svg class="svgIcon-use" width="20" height="20" viewBox="0 0 33 33"><path d="M28.86 17.342l-3.64-6.402c-.292-.433-.712-.729-1.163-.8a1.124 1.124 0 0 0-.889.213c-.63.488-.742 1.181-.33 2.061l1.222 2.587 1.4 2.46c2.234 4.085 1.511 8.007-2.145 11.663-.26.26-.526.49-.797.707 1.42-.084 2.881-.683 4.292-2.094 3.822-3.823 3.565-7.876 2.05-10.395zm-6.252 11.075c3.352-3.35 3.998-6.775 1.978-10.469l-3.378-5.945c-.292-.432-.712-.728-1.163-.8a1.122 1.122 0 0 0-.89.213c-.63.49-.742 1.182-.33 2.061l1.72 3.638a.502.502 0 0 1-.806.568l-8.91-8.91a1.335 1.335 0 0 0-1.887 1.886l5.292 5.292a.5.5 0 0 1-.707.707l-5.292-5.292-1.492-1.492c-.503-.503-1.382-.505-1.887 0a1.337 1.337 0 0 0 0 1.886l1.493 1.492 5.292 5.292a.499.499 0 0 1-.353.854.5.5 0 0 1-.354-.147L5.642 13.96a1.338 1.338 0 0 0-1.887 0 1.338 1.338 0 0 0 0 1.887l2.23 2.228 3.322 3.324a.499.499 0 0 1-.353.853.502.502 0 0 1-.354-.146l-3.323-3.324a1.333 1.333 0 0 0-1.886 0 1.325 1.325 0 0 0-.39.943c0 .356.138.691.39.943l6.396 6.397c3.528 3.53 8.86 5.313 12.821 1.353zM12.73 9.26l5.68 5.68-.49-1.037c-.518-1.107-.426-2.13.224-2.89l-3.303-3.304a1.337 1.337 0 0 0-1.886 0 1.326 1.326 0 0 0-.39.944c0 .217.067.42.165.607zm14.787 19.184c-1.599 1.6-3.417 2.392-5.353 2.392-.349 0-.7-.03-1.058-.082a7.922 7.922 0 0 1-3.667.887c-3.049 0-6.115-1.626-8.359-3.87l-6.396-6.397A2.315 2.315 0 0 1 2 19.724a2.327 2.327 0 0 1 1.923-2.296l-.875-.875a2.339 2.339 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.647l-.139-.139c-.91-.91-.91-2.39 0-3.3.884-.884 2.421-.882 3.301 0l.138.14a2.335 2.335 0 0 1 3.948-1.24l.093.092c.091-.423.291-.828.62-1.157a2.336 2.336 0 0 1 3.3 0l3.384 3.386a2.167 2.167 0 0 1 1.271-.173c.534.086 1.03.354 1.441.765.11-.549.415-1.034.911-1.418a2.12 2.12 0 0 1 1.661-.41c.727.117 1.385.565 1.853 1.262l3.652 6.423c1.704 2.832 2.025 7.377-2.205 11.607zM13.217.484l-1.917.882 2.37 2.837-.454-3.719zm8.487.877l-1.928-.86-.44 3.697 2.368-2.837zM16.5 3.293L15.478-.005h2.044L16.5 3.293z" fill-rule="evenodd"></path></svg>
              </span>
              {{ video.clap ? video.clap : 0 }}
            </div>
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
  props: ["videos", "header", "items", "showItems"],
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
  &_clap {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    background-color: #fff;
    font: 400 10px/20px $font-secondary;
    span {
      color: #4875d5;
      width: 20px;
      height: 20px;
      outline: 0;
      cursor: pointer;
      filter: drop-shadow(0 3px 12px rgba(0, 0, 0, 0.05));
      transform: scale(1);
      transition: all 0.1s ease-in;
      z-index: 1;
      fill: #4875d5;
      pointer-events: visible;
      vertical-align: top;
      display: inline-block;
    }
  }
}
</style>
