<template>
  <div class="model-page" v-if="model && producer">

    <div class="model-page_sidebar">
      <h2 class="model-page_subtitle">
        Pozostałe {{ producer.name }}
      </h2>
      <models-list :models="otherModels" :producer="producer.name" display="block" />
    </div>
    <div class="model-page_content">
      <h2 class="model-page_title">
        {{ producer.name }} {{ model.name }}
      </h2>
      <videos-list :videos="videos" items="2" />
    </div>
    <div class="model-page_channels">
      <engines-component :engines="model.engines" />
      <h2 class="model-page_subtitle">
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
import EnginesComponent from "./front/Components/Engines";

export default {
  name: "model-page",
  computed: {
    ...mapGetters({
      langs: "langVars"
    })
  },
  components: { VideosList, ModelsList, ChannelsList, EnginesComponent },
  data() {
    return {
      model: null,
      videos: null,
      producer: null,
      otherModels: null,
      channels: null,
      title: ""
    };
  },
  head: {
    title() {
      return {
        inner: this.title
      };
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      Meteor.call("models.slug", this.$route.params.slug, (error, result) => {
        this.model = result;
        Meteor.call("videos.model", this.model._id, (error, result) => {
          this.videos = result;
        });
        Meteor.call("producers.id", this.model.producer, (error, result) => {
          this.producer = result;
          this.title = `${this.producer.name} ${this.model.name}`;
          this.$emit("updateHead");
        });
        Meteor.call("models.producer", this.model.producer, (error, result) => {
          this.otherModels = result;
        });
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
.model-page {
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
    margin: 0 0 30px;
  }
  &_subtitle {
    font: 600 18px/1.3 $font-primary;
    color: #000;
    margin: 0 0 15px;
  }
  &_channels {
    padding: 0 20px 20px;

    border-left: 1px solid #e6e6e6;
  }
}
</style>
