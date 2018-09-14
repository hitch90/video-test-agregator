<template>
  <div>
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img :src="model.photo" :alt="model.name">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ model.name }}</strong>
              <br>
              {{ model.description }}
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <router-link class="level-item" :to="{ name: 'AdminEditModel', params: {id: model._id} }">
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
  </div>

</template>
<script type="text/javascript">
export default {
  name: "component-model",
  props: ["model"],
  methods: {
    remove() {
      Meteor.call("models.remove", this.model._id, (error, result) => {
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
