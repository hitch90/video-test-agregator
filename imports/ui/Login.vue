<template>
  <div class="page-login" v-if="langs">
    <div class="columns is-centered">
      <div class="column is-3 page-login_column">
        <header class="page-login_header">

        </header>
        <login-component class="page-login_content" />
        <footer class="page-login_footer">
          <router-link class="page-login_footerLink"
            :to="{ name: 'register'}" v-html="langs.login.havent_account">

          </router-link>
          <router-link class="page-login_footerLink"
            :to="{ name: 'register'}">
            {{ langs.login.forgot_password }}
          </router-link>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import LoginComponent from "./front/LoginComponent";
export default {
  name: "login-page",
  components: {
    LoginComponent
  },
  computed: {
    ...mapGetters({
      langs: "langVars",
      user: "getUser"
    })
  }
};
</script>
<style lang="scss" scoped>
@import "./scss/_variable";
.page-login {
  position: relative;
  &_column {
    max-width: 320px;
    border: 1px solid #dcdcde;
    padding: 0;
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
  }
  &_header {
    background: #edeff5;
    height: 100px;
  }
  &_content {
    padding: 15px;
  }
  &_footer {
    &Link {
      display: block;
      text-align: center;
      border-bottom: 1px solid #282a38;
      background: #2d3040;
      font: 400 12px/40px $font-primary;
      color: #fff;
      transition: 0.3s;
      &:hover {
        background: #3d4057; 
      }
    }
  }
}
</style>
