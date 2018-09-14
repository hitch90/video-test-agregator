<template>
  <div class="admin-homepage">
    <div class="">
      <b-tabs v-model="activeTab">
          <b-tab-item label="Edytuj producenta">
              <add-model-form :model="model" action="edit" />
          </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import AddModelForm from "./Form/Model";
export default {
  components: {
    AddModelForm
  },
  mounted() {
    Meteor.call("models.id", this.$route.params.id, (error, result) => {
      if (result) {
        this.model = result;
      }
    });
  },
  data() {
    return {
      activeTab: 0,
      model: null
    };
  }
};
</script>
