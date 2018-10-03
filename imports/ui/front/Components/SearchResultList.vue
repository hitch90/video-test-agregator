<template lang="html">
  <ul class="search-result-list-component">
    <li v-for="item in list">
      <router-link :to="{ name: routerName, params: { slug: item.slug } }">
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "search-result-list-component",
  props: ["list", "routerName"]
};
</script>

<style lang="scss">
@import "../../scss/_variable";

.search-result-list-component {
  list-style: none;
  padding: 0;

  margin: 0;
  li {
    & + li {
      margin-top: 15px;
    }
  }
  a {
    font: 600 14px/18px $font-primary;
    color: #000;
    display: block;
  }
}
</style>
