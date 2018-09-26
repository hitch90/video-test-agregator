<template>
  <header class="component-header">
    <div class="component-header_content">
      <logo-component class="component-header_logo" />
      <div class="component-header_navWrapper">
        <nav-component class="component-header_nav" />
        <search-component />
        <user-nav-component class="component-header_usernav" />
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from "vuex";
import SelectLangComponent from "./SelectLangComponent";
import UserNavComponent from "./UserNavComponent";
import LogoComponent from "./Logo";
import NavComponent from "./Nav";
import SearchComponent from './Search';
export default {
  name: "header-component",
  computed: {
    ...mapGetters({
      langs: "langVars",
      user: "getUser"
    })
  },
  components: {
    SelectLangComponent,
    UserNavComponent,
    LogoComponent,
    NavComponent,
    SearchComponent
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/_colors";
.component-header {
  height: 60px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  &_content {
    width: 100%;
    display: grid;
    grid-template-columns: 200px calc(100% - 200px);
    align-items: center;
    padding: 0 20px 0 0;
    max-width: 1200px;
    margin: 0 auto;
  }
  &_logo {
  }
  &_navWrapper {
    display: flex;
    align-items: center;
  }
  &_nav {
    flex: 1;
  }
  &_usernav {
    width: 200px;
  }
}
</style>
