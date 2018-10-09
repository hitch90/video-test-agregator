<template>
  <div class="send-page">
    
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "send-page",
  computed: {
    ...mapGetters({
      langs: "langVars"
    })
  },
  components: {},
  data() {
    return {};
  },
  head: {
    title() {
      return {
        inner: "Prześlij test"
      };
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./scss/_variable";
@import "./scss/_colors";
.send-page {
}
</style>
