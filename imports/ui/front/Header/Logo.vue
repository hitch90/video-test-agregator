<template>
  <h1 class="logo-component">
    <router-link :to="{ name: 'index' }">Autodium</router-link>
  </h1>
</template>

<script>
export default {
  name: "logo-component"
};
</script>

<style lang="scss">
@import "../../scss/_variable";
.logo-component {
  a {
    font: 900 20px/20px "Playfair Display";
    color: #000;
  }
}
</style>
