<template>
  <div class="search-page">
    <h2 class="search-page_title">
      Wyniki wyszukiwania dla: {{ $route.params.querystring }}
    </h2>
    <div class="search-page_item" v-if="videos && videos.length">
      <h3 class="search-page_subtitle">
        Testy video
        <a href="#" @click="showMore">Zobacz więcej ></a>
      </h3>
      <videos-list :videos="videos" :show-items="items" />
    </div>
    <div class="search-page_items">
      <div class="search-page_item" v-if="channels && channels.length">
        <h3 class="search-page_subtitle">
          Kanały
        </h3>
        <channels-list :channels="channels" />
      </div>
      <div class="search-page_item" v-if="producers && producers.length">
        <h3 class="search-page_subtitle">
          Marki
        </h3>
        <search-result-list :list="producers" router-name="ProducerPage" />
      </div>
      <div class="search-page_item" v-if="models && models.length">
        <h3 class="search-page_subtitle">
          Modele
        </h3>
        <search-result-list :list="models" router-name="ModelPage" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VideosList from "./front/Components/VideosList";
import ModelsList from "./front/Components/ModelsList";
import ChannelsList from "./front/Components/ChannelsList";
import SearchResultList from "./front/Components/SearchResultList";
import anchorme from "anchorme";

export default {
  name: "search-page",
  computed: {
    ...mapGetters({
      langs: "langVars"
    })
  },
  components: {
    VideosList,
    ModelsList,
    ChannelsList,
    SearchResultList
  },
  data() {
    return {
      channels: null,
      videos: null,
      producers: null,
      models: null,
      items: 5
    };
  },
  head: {
    title() {
      return {
        inner: `Wyniki wyszukiwania dla ${this.$route.params.querystring}`
      };
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      Meteor.call(
        "videos.search",
        this.$route.params.querystring,
        (error, result) => {
          this.videos = result;
        }
      );
      Meteor.call(
        "producers.search",
        this.$route.params.querystring,
        (error, result) => {
          this.producers = result;
        }
      );
      Meteor.call(
        "models.search",
        this.$route.params.querystring,
        (error, result) => {
          this.models = result;
        }
      );
      Meteor.call(
        "channels.search",
        this.$route.params.querystring,
        (error, result) => {
          this.channels = result;
        }
      );
    },
    showMore() {
      this.items = this.videos.length;
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
.search-page {
  &_title {
    font: 600 26px/1.3 $font-primary;
    color: #000;
    display: flex;
    align-items: center;
    padding: 0 0 30px;
    a {
      font-size: 18px;
      display: inline-block;
      color: #4875d5;
      margin: 0 0 0 auto;
    }
  }
  &_subtitle {
    font: 600 18px/18px $font-primary;
    color: #000;
    display: flex;
    align-items: flex-end;
    padding: 0 0 30px;
    a {
      font-size: 13px;
      line-height: 18px;
      display: inline-block;
      color: #4875d5;
      margin: 0 0 0 15px;
    }
  }
  &_item {
    padding: 0 0 30px;
    margin: 0 0 30px;
    border-bottom: 1px solid #e6e6e6;
  }
  &_items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 30px;
  }
}
</style>
