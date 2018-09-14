<template>
  <div class="component-lang">
    <span class="component-lang_label">
      Change lang
    </span>
    <ul class="component-lang_list">
      <li @click="setLang('en')" :class="{'is-active': activeLang == 'en'}">
        <img src="/images/flags/eu.png" />
      </li>
      <li @click="setLang('pl')" :class="{'is-active': activeLang == 'pl'}">
        <img src="/images/flags/pl.png" />
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "select-lang-component",
  computed: {
    ...mapGetters({
      langs: "langVars"
    })
  },
  data() {
    return {
      activeLang: "en"
    }; 
  },
  components: {},
  methods: {
    setLang(lang) {
      this.$store.dispatch("setLang", lang);
      this.activeLang = lang;
    }
  }
};
</script>
<style lang="scss">
@import "../../scss/_variable";
@import "../../scss/_colors";
.component-lang {
  display: flex;
  align-items: center;
  &_label {
    white-space: nowrap;
    margin-right: 10px;
    font: 500 13px/24px $font-primary;
  }
  &_list {
    display: flex;
    li {
      flex: 1;
      padding: 5px;
      border-radius: 3px;
      margin: 0 5px;
      cursor: pointer;
      &.is-active {
        background-color: #e6e9f0;
      }
    }
    img {
      vertical-align: middle;
      max-width: 24px;
    }
  }
}
</style>
