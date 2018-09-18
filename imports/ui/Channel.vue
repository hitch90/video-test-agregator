<template>
  <div class="channel-page" v-if="channel">
    <div class="channel-page_sidebar">
      <h2 class="channel-page_subtitle">...</h2>
    </div>
    <div class="channel-page_content">
      <h2 class="channel-page_title">
        {{ channel.name }}
      </h2>
      <videos-list :videos="videos" items="2" />
    </div>
    <div class="channel-page_channels">
      <h2 class="channel-page_subtitle">
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

export default {
  name: "channel-page",
  computed: {
    ...mapGetters({
      langs: "langVars"
    })
  },
  components: { VideosList, ModelsList, ChannelsList },
  data() {
    return {
      channel: null,
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
      Meteor.call("channels.slug", this.$route.params.slug, (error, result) => {
        this.channel = result;
        Meteor.call("videos.channel", this.channel._id, (error, result) => {
          this.videos = result;
        });
        // Meteor.call("producers.id", this.channel.producer, (error, result) => {
        //   this.producer = result;
        // });
        // Meteor.call("channels.producer", this.channel.producer, (error, result) => {
        //   this.otherModels = result;
        // });
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
.channel-page {
  display: grid;
  grid-template-columns: 250px 7fr 2fr;
  grid-column-gap: 30px;
  &_sidebar {
    padding: 20px;
    background: #f8f8f8;
  }
  &_title {
    font: 600 26px/1.3 $font-primary;
    color: #000;
  }
  &_subtitle {
    font: 600 18px/1.3 $font-primary;
    color: #000;
    margin: 0 0 15px;
  }
  &_channels {
    padding: 20px;
    border-left: 1px solid #e6e6e6;
  }
}
</style>
