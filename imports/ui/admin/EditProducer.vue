<template>
  <div class="admin-homepage">
    <div class="">
      <b-tabs v-model="activeTab">
          <b-tab-item label="Edytuj producenta">
              <add-producer-form :producer="producer" action="edit" />
          </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import AddProducerForm from "./Form/Producer";
export default {
  components: {
    AddProducerForm
  },
  mounted() {
    Meteor.call("producers.id", this.$route.params.id, (error, result) => {
      if (result) {
        this.producer = result;
      }
    });
  },
  data() {
    return {
      activeTab: 0,
      producer: null
    };
  }
};
</script>
