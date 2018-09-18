<template lang="html">
  <ul class="engines-list-component" v-if="engines.length">
    <li class="engines-list-component_label" :class="label" v-if="label">
      {{ label }}
    </li>
    <li class="engines-list-component_item" v-for="engine in engines">
      {{ engine.capacity }},
      {{ engine.power }}KM
    </li>
  </ul>
</template>

<script>
export default {
  name: "engines-list-component",
  props: ["engines", "label"]
};
</script>

<style lang="scss">
@import "../../scss/_variable";
@import "../../scss/_colors";

.engines-list-component {
  flex: 1;
  &_label {
    font: 400 13px/35px $font-secondary;
    color: #fff;
    display: inline-block;
    padding: 0 15px;
    margin: 15px 0;
    &.Benzyna {
      background: $success-color;
    }
    &.Diesel {
      background: #000;
    }
    &.Hybryda {
      background: $brand-tertiary;
    }
  }
  &_item {
    font: 700 14px/2 $font-secondary;
    color: #000;
  }
}
</style>
