<template>
  <div class="admin-homepage">
    <div class="content">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <router-link :to="{ name: 'AdminChannels', query: {add: true} }" class="tile is-child notification is-primary">
                <p class="title">Dodaj kanał</p>
              </router-link>
            </div>
            <div class="tile is-parent">
              <router-link :to="{ name: 'AdminChannels' }" class="tile is-child notification is-warning">
                <p class="title">Lista kanałów</p>
              </router-link>
            </div>
          </div>
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <router-link :to="{ name: 'AdminProducers', query: {add: true} }" class="tile is-child notification is-primary">
                <p class="title">Dodaj producenta</p>
              </router-link>
            </div>
            <div class="tile is-parent">
              <router-link :to="{ name: 'AdminProducers' }" class="tile is-child notification is-warning">
                <p class="title">Lista producentów</p>
              </router-link>
            </div>
          </div>
          <div class="tile">
            <div class="tile is-parent">
              <router-link :to="{ name: 'AdminModels', query: {add: true} }" class="tile is-child notification is-primary">
                <p class="title">Dodaj model</p>
              </router-link>
            </div>
            <div class="tile is-parent">
              <router-link :to="{ name: 'AdminModels' }" class="tile is-child notification is-warning">
                <p class="title">lista modeli</p>
              </router-link>
            </div>
          </div>
          <div class="tile">
            <div class="tile is-parent">
              <router-link :to="{ name: 'AdminVideos', query: {add: true} }" class="tile is-child notification is-primary">
                <p class="title">Dodaj video</p>
              </router-link>
            </div>
            <div class="tile is-parent">
              <router-link :to="{ name: 'AdminVideos' }" class="tile is-child notification is-warning">
                <p class="title">lista filmów</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    // Meteor.call("api.games.all", (error, result) => {
    //   this.games = result;
    // });
  },
  components: {},
  data() {
    return {};
  }
};
</script>
