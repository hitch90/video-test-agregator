<template lang="html">
  <div v-if="open == 'model'">
    <div class="component-nav_subNavWrapper">
      <ul class="component-nav_subNavList">
        <li v-for="producer in producers" :key="producer._id">
          <a class="component-nav_subNavListLink"
            href="#"
            @click.prevent="loadModels(producer._id)"
            :class="{'active': activeElement == producer._id }">{{ producer.name }}</a>
        </li>
      </ul>
      <div class="component-nav_subNavContent producers" v-if="models">
        <ul class="component-nav_subNavModels">
          <model-item v-for="model in models" :model="model" :key="model._id"></model-item>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ModelItem from "./Model";

export default {
  name: "component-nav-producers",
  props: ["producers", "open"],
  components: {
    ModelItem
  },
  data() {
    return {
      models: null,
      activeElement: null
    };
  },
  methods: {
    loadModels(id) {
      this.activeElement = id;
      Meteor.call("models.producer", id, (error, result) => {
        if (result) {
          this.models = result;
        }
      });
    }
  }
};
</script>

<style lang="css">
</style>
