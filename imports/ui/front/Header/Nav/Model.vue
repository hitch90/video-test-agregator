<template lang="html">
  <li class="nav-model">
    {{ model.name }}
  </li>
</template>

<script>
export default {
  name: "nav-model-component",
  props: ["model"]
};
</script>

<style lang="scss">
</style>
