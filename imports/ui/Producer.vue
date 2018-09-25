<template>
  <div class="producer-page" v-if="producer">
    <div class="producer-page_section">
      <models-list :models="models" :producer="producer.name" :header="`<span>${producer.name}</span> - wybierz model`" />
    </div>
    <div class="producer-page_section">
      <videos-list :videos="videos" :producer="producer.name" :header="`Testy video <span>${producer.name}</span>`" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ModelsList from "./front/Components/ModelsList";
import VideosList from "./front/Components/VideosList";
export default {
  name: "producer-page",
  computed: {
    ...mapGetters({
      langs: "langVars"
    })
  },
  components: { ModelsList, VideosList },
  data() {
    return {
      producer: null,
      models: null,
      videos: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      Meteor.call(
        "producers.slug",
        this.$route.params.slug,
        (error, result) => {
          this.producer = result;
          Meteor.call("models.producer", this.producer._id, (error, result) => {
            this.models = result;
          });
          Meteor.call("videos.producer", this.producer._id, (error, result) => {
            this.videos = result;
          });
        }
      );
      // Meteor.call("videos.all", (error, result) => {
      //   this.videos = result;
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./scss/_variable";
@import "./scss/_colors";
.producer-page {
  &_section {
    padding: 15px;
    border-bottom: 1px solid #e4e4e4;
    @include media($tablet-big) {
      padding: 50px 0;
    }
  }
}
</style>
