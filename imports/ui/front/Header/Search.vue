<template lang="html">
  <div class="search-component">
    <router-link :to="{name: 'SearchPage', params: {querystring: querystring } }" class="search-component_icon" @click="search">
      <font-awesome-icon :icon="['fas', 'search']" />
    </router-link>
    <input type="search" v-model="querystring" placeholder="Szukaj..." class="search-component_input" @keyup.enter="search" />
  </div>
</template>

<script>
export default {
  name: 'search-component',
  data() {
    return {
      querystring: null
    }
  },
  methods: {
    search() {
      if (this.querystring) {
        console.log('a')
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/_variable";
@import "../../scss/_colors";

  .search-component {
      padding: 0;
      margin: 0 30px;
      position: relative;
      border: 2px solid $brand-tertiary;
      border-radius: 30px;
      width: 250px;
      overflow: hidden;
      height: 31px;
      &_input {
        border: 0;
        width: calc(100% - 15px);
        padding: 0 20px;
        margin: 0 15px 0 0;
        font: 400 14px/28px $font-secondary;
        display: block;
        outline: 0;
      }
      &_icon {
        position: absolute;
        top: -1px;
        right: 0;
        padding: 0 10px;
        line-height: 30px;
        height: 30px;
        display: block;
        color: #fff;
        background: $brand-tertiary;
        &:hover {
          color: #000;
        }
        cursor: pointer;
      }
  }
</style>
