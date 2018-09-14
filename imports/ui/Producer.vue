<template>
  <div class="producer-page">
    <h2 class="producer-page_title">
      {{ producer.name }}
    </h2>
    <models-list :models="models" :producer="producer.name" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ModelsList from "./front/Components/ModelsList";
export default {
  name: "producer-page",
  computed: {
    ...mapGetters({
      langs: "langVars"
    })
  },
  components: { ModelsList },
  data() {
    return {
      producer: null,
      models: null
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
}
</style>
