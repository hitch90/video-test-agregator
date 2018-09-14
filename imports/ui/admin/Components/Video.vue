<template>
  <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img :src="video.photo" :alt="video.name">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <strong>{{ video.name }}</strong>
        <p style="white-space: pre;" v-html="renderDesc"></p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <router-link class="level-item" :to="{ name: 'AdminEditVideo', params: {id: video._id} }">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'edit']" />
            </span>
          </router-link>
          <a class="level-item" aria-label="retweet" @click.prevent="remove">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>
</template>
<script type="text/javascript">
import anchorme from "anchorme";

export default {
  name: "component-video",
  props: ["video"],
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
