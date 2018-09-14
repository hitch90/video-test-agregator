<template>
  <div class="admin-homepage">
    <section class="hero is-primary">
      <div class="hero-body is-bold">
        <div class="container">
          <h1 class="title">
            Modele
          </h1>
        </div>
      </div>
    </section>
    <div class="">
      <b-tabs v-model="activeTab">
            <b-tab-item label="Lista modeli">
              <div class="columns is-multiline">
                <model-item class="column is-3" v-for="model in models" :model="model" :key="model._id" @update-list="getModels" />
              </div>
            </b-tab-item>
            <b-tab-item label="Dodaj nowy model">
                <add-model-form @update-list="getModels" />
            </b-tab-item>
        </b-tabs>
    </div>
  </div>
</template>
<script>
import AddModelForm from "./Form/Model";
import ModelItem from "./Components/Model";
export default {
  components: {
    AddModelForm,
    ModelItem
  },
  mounted() {
    this.getModels();
    if (this.$route.query.add) {
      this.activeTab = 1;
    }
  },
  data() {
    return {
      activeTab: 0,
      models: null
    };
  },
  methods: {
    getModels() {
      Meteor.call("models.all", (error, result) => {
        this.models = result;
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
