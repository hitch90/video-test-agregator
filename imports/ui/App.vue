<template>
  <div :class="`app ${user ? 'is-login' : ''}`">
    <header-component></header-component>
    <transition name="slide-left" mode="out-in">
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </transition>
  </div>
</template>
<script>
import HeaderComponent from "./front/Header/HeaderComponent";
import isUser from "./helpers/isUser";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    HeaderComponent
  },
  computed: {
    ...mapGetters({
      langs: "langVars",
      user: "getUser"
    })
  },
  mounted() {
    isUser().then(response => {
      response
        ? this.$store.dispatch("setUser", response)
        : this.$store.dispatch("setUser", null);
    });
  }
};
</script>
<style lang="scss">
@import "./scss/_variable";
.app {
  padding: 60px 0 0;
  min-height: 100vh;
  font-family: $font-secondary;
}
.wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 0;
}
.slide-left-leave {
  transform: translateX(0) scale(1);
  opacity: 1;
}
.slide-left-leave-to {
  transform: translateX(-20%) scale(1);
  opacity: 0;
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-enter-to {
  transform: translateX(0);
}
.slide-left-enter-active {
  transition: transform 0.5s;
}
.slide-left-leave-active {
  transition: transform 0.5s, opacity 0.4s;
}
</style>
