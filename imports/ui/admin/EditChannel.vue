<template>
  <div class="admin-homepage">
    <div class="">
      <b-tabs v-model="activeTab">
          <b-tab-item label="Edytuj kanał">
              <add-channel-form :channel="channel" action="edit" />
          </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import AddChannelForm from "./Form/Channel";
export default {
  components: {
    AddChannelForm
  },
  mounted() {
    Meteor.call("channels.id", this.$route.params.id, (error, result) => {
      if (result) {
        this.channel = result;
      }
    });
  },
  data() {
    return {
      activeTab: 0,
      channel: null
    };
  }
};
</script>
