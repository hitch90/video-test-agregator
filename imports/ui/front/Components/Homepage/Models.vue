<template lang="html">
  <div class="models-component">
    <h2 class="models-component_title">
      Ostatnio dodane samochody
    </h2>
    <models-list :models="models" />
  </div>
</template>

<script>
import ModelsList from "../ModelsList";
export default {
  name: "models-component",
  components: {
    ModelsList
  },
  props: ["models"]
};
</script>

<style lang="scss" scoped>
@import "../../../scss/_variable";

.models-component {
  &_title {
    font: 600 18px/1.3 $font-primary;
    color: #000;
    padding: 0 0 15px;
    @include media($tablet-big) {
      padding: 0 0 30px;
      font: 600 26px/1.3 $font-primary;
    }
  }
}
</style>
