<template lang="html">
  <div class="producers-component">
    <h2 class="producers-component_title">
      Wybierz markę
    </h2>
    <ul class="producers-component_list">
      <li class="producers-component_item" v-for="producer in renderProducers" :key="producer._id"
      v-if="producer.count > 0">
        <router-link :to="{ name: 'ProducerPage', params: { slug: producer.slug } }">
          <div class="producers-component_image">
            <img :src="producer.photo" :alt="producer.name" />
          </div>
          {{ producer.name }} ({{ producer.count }})
        </router-link>
      </li>
    </ul>
    <div class="producers-component_alert">
      <span>
        <font-awesome-icon :icon="['fas', 'info-circle']" />
      </span>
      Wyświetlane są tylko marki, w których znajdują się testy video.
    </div>
  </div>
</template>

<script>
export default {
  name: "producers-component",
  props: {
    producers: {
      default: null
    }
  },
  computed: {
    renderProducers() {
      return this.producers;
    }
  },
  // data() {
  //   return {
  //     renderProducers: null
  //   };
  // },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.renderProducers) {
        for (let i = 0; this.renderProducers.length > i; i++) {
          this.count(i);
        }
      }
    },
    count(i) {
      Meteor.call(
        "videos.countProducer",
        this.renderProducers[i]._id,
        (error, result) => {
          this.renderProducers[i].count = result;
        }
      );
    }
  },
  watch: {
    producers() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/_variable";

.producers-component {
  &_title {
    font: 600 18px/1.3 $font-tertiary;
    color: #000;
    padding: 0 0 15px;
    @include media($tablet-big) {
      padding: 0 0 30px;
      font: 600 26px/1.3 $font-tertiary;
    }
  }
  &_list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    @include media($tablet-big) {
      grid-template-columns: repeat(12, 1fr);
      grid-row-gap: 30px;
      grid-column-gap: 30px;
    }
  }
  &_image {
    height: 35px;
    margin: 0 auto 5px;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    @include media($tablet-big) {
      height: 45px;
    }
    img {
      max-width: 45px;
      @include media($tablet-big) {
        max-width: 55px;
      }
      width: 100%;
    }
  }
  &_item {
    font: 600 14px/1.3 $font-primary;
    color: #000;
    text-align: center;
    a {
      color: #000;
      display: block;
      &:hover {
        color: #969696;
      }
    }
  }
  &_alert {
    background: #fafafa;
    display: inline-block;
    padding: 10px 20px;
    font: 400 13px/13px $font-secondary;
    margin: 25px 0 0;
    border-radius: 3px;
    span {
      margin-right: 5px;
      display: inline-block;
    }
  }
}
</style>
