<template>
  <div>
    <div class="box">
      <figure class="image">
        <img :src="video.photo" :alt="video.name">
      </figure>
      <div class="media-content">
        <div class="content">
          <strong>{{ video.name }}</strong>
          <!-- <p style="white-space: pre-wrap;" v-html="video.description.substr(0, 50)"></p> -->
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <router-link class="level-item" :to="{ name: 'AdminEditVideo', params: {id: video._id} }">
              Edytuj&nbsp;&nbsp;
              <span class="icon is-small">
                <font-awesome-icon :icon="['fas', 'edit']" />
              </span>
            </router-link>
            <a class="level-item" aria-label="retweet" @click.prevent="remove">
              Usuń&nbsp;&nbsp;
              <span class="icon is-small">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">

export default {
  name: "component-video",
  props: ["video"],
  methods: {
    remove() {
      Meteor.call("videos.remove", this.video._id, (error, result) => {
        if (result) {
          this.$toast.open({
            message: "Film usunięty",
            type: "is-success"
          });
          this.$emit("update-list");
        }
      });
    }
  }
};
</script>
