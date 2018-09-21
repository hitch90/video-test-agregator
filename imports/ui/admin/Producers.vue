<template>
  <div class="admin-homepage">
    <section class="hero is-primary">
      <div class="hero-body is-bold">
        <div class="container">
          <h1 class="title">
            Producenci
          </h1>
        </div>
      </div>
    </section>
    <div class="">
      <b-tabs v-model="activeTab">
            <b-tab-item label="Lista producentów">
              <div class="columns is-multiline">
                <producer-item class="column is-3" v-for="producer in producers" :producer="producer" :key="producer._id" @update-list="getProducers" />
              </div>
            </b-tab-item>
            <b-tab-item label="Dodaj nowego producenta">
                <add-producer-form @update-list="getProducers" />
            </b-tab-item>
        </b-tabs>
    </div>
  </div>
</template>
<script>
import AddProducerForm from "./Form/Producer";
import ProducerItem from "./Components/Producer";
export default {
  components: {
    AddProducerForm,
    ProducerItem
  },
  mounted() {
    this.getProducers();
    if (this.$route.query.add) {
      this.activeTab = 1;
    }
  },
  data() {
    return {
      activeTab: 0,
      producers: null
    };
  },
  methods: {
    getProducers() {
      Meteor.call("producers.all", (error, result) => {
        this.producers = result;
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
