<template lang="html">
  <div class="producers-component">
    <h2 class="producers-component_title">
      Wybierz markę
    </h2>
    <ul class="producers-component_list">
      <li class="producers-component_item" v-for="producer in producers" :key="producer._id">
        <router-link :to="{ name: 'ProducerPage', params: { slug: producer.slug } }">
          <div class="producers-component_image">
            <img :src="producer.photo" :alt="producer.name" />
          </div>
          {{ producer.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "producers-component",
  props: ["producers"]
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
      grid-template-columns: repeat(8, 1fr);
      grid-row-gap: 30px;
      grid-column-gap: 30px;
    }
  }
  &_image {
    height: 55px;
    margin: 0 auto 5px;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    @include media($tablet-big) {
      height: 80px;
    }
    img {
      max-width: 55px;
      @include media($tablet-big) {
        max-width: 80px;
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
}
</style>
