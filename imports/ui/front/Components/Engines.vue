<template lang="html">
  <div class="engines-component">
    <h3 class="engines-component_header">
      Dostępne silniki
    </h3>
    <div class="engines-component_fuels">
      <engines-list :engines="benzinEngines" label="Benzyna" />
      <engines-list :engines="dieselEngines" label="Diesel" />
      <engines-list :engines="hybridEngines" label="Hybryda" />
      <engines-list :engines="electricEngines" label="Elektryczny" />
    </div>
  </div>
</template>

<script>
import EnginesList from "./EnginesList";

export default {
  name: "engines-component",
  props: ["engines"],
  components: {
    EnginesList
  },
  computed: {
    benzinEngines() {
      return this.engines.filter(option => {
        return (
          option.fuel
            .toString()
            .toLowerCase()
            .indexOf("benzyna") >= 0
        );
      });
    },
    dieselEngines() {
      return this.engines.filter(option => {
        return (
          option.fuel
            .toString()
            .toLowerCase()
            .indexOf("diesel") >= 0
        );
      });
    },
    hybridEngines() {
      return this.engines.filter(option => {
        return (
          option.fuel
            .toString()
            .toLowerCase()
            .indexOf("hybryda") >= 0
        );
      });
    },
    electricEngines() {
      return this.engines.filter(option => {
        return (
          option.fuel
            .toString()
            .toLowerCase()
            .indexOf("elektryczny") >= 0
        );
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/_variable";

.engines-component {
  margin: 0 0 30px;
  &_header {
    font: 600 18px/1.3 $font-primary;
    color: #000;
  }
  &_fuels {
    border-bottom: 1px solid #e6e6e6;
    padding: 0 0 30px;
  }
}
</style>
