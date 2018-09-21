<template>
  <div class="admin-homepage">
    <section class="hero is-primary">
      <div class="hero-body is-bold">
        <div class="container">
          <h1 class="title">
            Filmy, testy video
          </h1>
        </div>
      </div>
    </section>
    <div class="columns">
      <div class="column">
        <b-tabs v-model="activeTab">
              <b-tab-item label="Lista filmów">
                <div class="columns is-multiline">
                  <video-item class="column is-3" v-for="video in videos" :video="video" :key="video._id" @update-list="getVideo" />
                </div>
              </b-tab-item>
              <b-tab-item label="Dodaj nowy film">
                  <add-video-form @update-list="getVideo" />
              </b-tab-item>
          </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import AddVideoForm from "./Form/Video";
import VideoItem from "./Components/Video";
export default {
  components: {
    AddVideoForm,
    VideoItem
  },
  mounted() {
    this.getVideo();
    if (this.$route.query.add) {
      this.activeTab = 1;
    }
  },
  data() {
    return {
      activeTab: 0,
      videos: null
    };
  },
  methods: {
    getVideo() {
      Meteor.call("videos.all", (error, result) => {
        this.videos = result;
      });
    }
  },
  watch: {
    "$route.query"() {
      if (this.$route.query.add) {
        this.activeTab = 1;
      }
    }
  }
};
</script>
