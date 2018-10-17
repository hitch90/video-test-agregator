<template>
  <div class="video-page" v-if="video">
    <div class="video-page_sidebar">
      <div class="video-page_info">
        <div class="video-page_channelInfo">
          <router-link :to="{name: 'ChannelPage', params: {slug: video.channel.slug }}" class="video-page_channel">
            <img :src="video.channel.photo" :alt="video.channel.name" />
            <span>{{ video.channel.name }}</span>
          </router-link>
        </div>
        <div class="video-page_carInfo">
          <h3 class="video-page_car">
            <router-link
              class="video-page_carLink"
              :to="{name: 'ProducerPage', params: {slug: video.producer.slug }}">
              <img :src="video.producer.photo" :alt="video.producer.name" />
              <span>{{ video.producer.name }}</span>
            </router-link>
            <router-link :to="{name: 'ModelPage', params: {slug: video.model.slug }}">
              {{ video.model.name }}
            </router-link>
          </h3>
          <p class="video-page_carEngine" v-if="video.engine">
            <span class="video-page_option">Silnik</span> {{ video.engine.capacity }}, {{ video.engine.power }}KM<br />
            <span class="video-page_option">Maksymalny moment</span> {{ video.engine.torque }}<br />
            <span class="video-page_label" :class="video.engine.fuel">
              {{ video.engine.fuel }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="video-page_content">
      <video-component :id="video.video_id" />
      <h2 class="video-page_title">
        <span>{{ video.name }}</span>
        <clap-component :clap-count="video.clap ? video.clap : 0" />

      </h2>
      <div class="video-page_desc" v-html="renderDesc"></div>
    </div>
    <div class="video-page_videos">
      <h2 class="video-page_subtitle">
        Kanały
      </h2>
      <channels-list :channels="channels" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VideosList from "./front/Components/VideosList";
import ModelsList from "./front/Components/ModelsList";
import ChannelsList from "./front/Components/ChannelsList";
import VideoComponent from "./front/Components/YTVideo";
import anchorme from "anchorme";
import ClapComponent from "./front/Components/Clap";
export default {
  name: "video-page",
  computed: {
    ...mapGetters({
      langs: "langVars"
    })
  },
  computed: {
    renderDesc() {
      return anchorme(this.video.description, {
        attributes: [
          {
            name: "target",
            value: "_blank"
          }
        ]
      });
    }
  },
  components: {
    VideosList,
    ModelsList,
    ChannelsList,
    VideoComponent,
    ClapComponent
  },
  data() {
    return {
      video: null,
      videos: null,
      producer: null,
      otherModels: null,
      channels: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      Meteor.call("videos.id", this.$route.params.id, (error, result) => {
        this.video = result;
      });
      Meteor.call("channels.all", (error, result) => {
        this.channels = result;
      });
    }
  },
  watch: {
    "$route.params"() {
      this.init();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./scss/_variable";
@import "./scss/_colors";
.video-page {
  display: flex;
  flex-wrap: wrap;
  @include media($tablet-big) {
    display: grid;
    grid-template-columns: 250px 7fr 2fr;
    grid-column-gap: 30px;
  }

  &_sidebar {
    padding: 10px;
    background: #f8f8f8;
    order: 2;
    width: 100%;
    @include media($tablet-big) {
      order: inherit;
      width: auto;
      padding: 20px;
    }
  }
  &_title {
    font: 600 26px/1.3 $font-primary;
    color: #000;
    margin: 30px 0;
    display: flex;
    align-items: center;
    span {
      flex: 1;
    }
    div {
      width: 100px;
    }
  }
  &_info {
  }
  &_desc {
    font: 400 14px/1.5 $font-secondary;
    padding: 0 0 30px;
    border-bottom: 1px solid #e6e6e6;
    margin: 0 0 30px;
    white-space: pre-wrap;
  }
  &_content {
    order: 1;
    width: 100%;
    padding: 10px;
    @include media($tablet-big) {
      width: auto;
      order: inherit;
      padding: 0;
    }
  }
  &_channel {
    display: flex;
    align-items: center;
    color: #000;
    margin: 0 0 15px;
    &:hover {
      color: #969696;
      img {
        filter: grayscale(100%);
      }
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      filter: grayscale(0);
      transition: 0.3s;
    }
    span {
      font: 600 13px/1.3 $font-primary;
    }
  }
  &_car {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    a {
      color: #000;
      font: 600 13px/1.3 $font-primary;
      img {
        width: 40px;
        margin-right: 10px;
        filter: grayscale(0);
        transition: 0.3s;
      }
      &:hover {
        color: #969696;
        img {
          filter: grayscale(100%);
        }
      }
    }
    &Link {
      display: flex;
      align-items: center;
      margin-right: 3px;
    }
    &Engine {
      padding: 10px 0;
      font: 600 13px/2 $font-primary;
      color: #000;
    }
  }
  &_subtitle {
    font: 600 18px/1.3 $font-primary;
    color: #000;
    margin: 0 0 15px;
  }
  &_videos {
    border-left: 1px solid #e6e6e6;
    padding: 10px;
    border-left: 1px solid #e6e6e6;
    order: 3;
    width: 100%;
    @include media($tablet-big) {
      order: inherit;
      width: auto;
      padding: 0 20px 20px;
    }
  }
  &_label {
    font: 400 11px/25px $font-secondary;
    color: #fff;
    display: inline-block;
    padding: 0 5px;
    margin: 5px 0;
    &.Benzyna {
      background: $success-color;
    }
    &.Diesel {
      background: #000;
    }
    &.Hybryda {
      background: $brand-tertiary;
    }
  }
  &_option {
    font: 400 13px/2 $font-primary;
  }
}
</style>
