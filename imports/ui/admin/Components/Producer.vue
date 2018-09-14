<template>
  <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img :src="producer.photo" :alt="producer.name">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ producer.name }}</strong>
          <br>
          {{ producer.description }}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <router-link class="level-item" :to="{ name: 'AdminEditProducer', params: {id: producer._id} }">
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
  name: "component-producer",
  props: ["producer"],
  methods: {
    remove() {
      Meteor.call("producers.remove", this.producer._id, (error, result) => {
        if (result) {
          this.$toast.open({
            message: "Producent usunięty",
            type: "is-success"
          });
          this.$emit("update-list");
        }
      });
    }
  }
};
</script>
