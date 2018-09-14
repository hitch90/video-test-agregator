<template>
  <div class="admin-homepage">
    <div class="">
      <b-tabs v-model="activeTab">
          <b-tab-item label="Edytuj film">
              <add-video-form :video="video" action="edit" />
          </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import AddVideoForm from "./Form/Video";
export default {
  components: {
    AddVideoForm
  },
  mounted() {
    Meteor.call("videos.id", this.$route.params.id, (error, result) => {
      if (result) {
        this.video = result;
      }
    });
  },
  data() {
    return {
      activeTab: 0,
      video: null
    };
  }
};
</script>
