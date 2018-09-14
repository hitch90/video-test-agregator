<template>
  <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img :src="channel.photo" :alt="channel.name">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ channel.name }}</strong>
          <br>
          {{ channel.description }}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <router-link class="level-item" :to="{ name: 'AdminEditChannel', params: {id: channel._id} }">
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
export default {
  name: "component-channel",
  props: ["channel"],
  methods: {
    remove() {
      Meteor.call("channels.remove", this.channel._id, (error, result) => {
        if (result) {
          this.$toast.open({
            message: "Kanał usunięty",
            type: "is-success"
          });
          this.$emit("update-list");
        }
      });
    }
  }
};
</script>
