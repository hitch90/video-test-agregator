<template>
  <div class="component-search">
    <div class="component-search_icon">
      <font-awesome-icon :icon="['fas', 'search']" />
    </div>
    <div class="component-search_input">
      <input type="text"  :value="querystring" @input="updateQuery" :placeholder="langs.nav_bar.search_placeholder" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "search-component",
  computed: {
    ...mapGetters({
      langs: "langVars"
    }),
    ...mapState({
      querystring: state => state.querystring
    })
  },
  data() {
    return {};
  },
  methods: {
    updateQuery(e) {
      this.$store.commit("updateQuery", e.target.value);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../scss/_variable";
.component-search {
  height: 64px;
  border-right: 1px solid #edeef1;
  display: flex;
  align-items: center;
  margin-right: 15px;
  &_icon {
    width: 50px;
    text-align: center;
    color: #d3d5e8;
  }
  &_input {
    width: calc(100% - 50px);
    input {
      width: 100%;
      border: 0;
      line-height: 64px;
      font: 500 13px/64px $font-primary;
      outline: 0;
      color: #a4a6c0;
    }
  }
}
</style>
