<template>
  <div class="admin-homepage">
    <section class="hero is-primary">
      <div class="hero-body is-bold">
        <div class="container">
          <h1 class="title">
            Kanały
          </h1>
        </div>
      </div>
    </section>
    <div class="">
      <b-tabs v-model="activeTab">
            <b-tab-item label="Lista kanałów">
                <channel-item  v-for="channel in channels" :channel="channel" :key="channel._id" @update-list="getChannels" />
            </b-tab-item>
            <b-tab-item label="Dodaj nowy kanał">
                <add-channel-form @update-list="getChannels" />
            </b-tab-item>
        </b-tabs>
    </div>
  </div>
</template>
<script>
import AddChannelForm from "./Form/Channel";
import ChannelItem from "./Components/Channel";
export default {
  components: {
    AddChannelForm,
    ChannelItem
  },
  mounted() {
    this.getChannels();
    if (this.$route.query.add) {
      this.activeTab = 1;
    }
  },
  data() {
    return {
      activeTab: 0,
      channels: null
    };
  },
  methods: {
    getChannels() {
      Meteor.call("channels.all", (error, result) => {
        this.channels = result;
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
