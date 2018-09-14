<template>
  <div v-if="langs" class="component-login">
    <div class="field component-login_field">
      <label class="label component-login_label">{{ langs.login.username }}</label>
      <p class="control has-icons-left">
        <input class="input component-login_input" type="text" placeholder="eg. john@gmail.com" v-model="login_form.username" />
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </span>
      </p>
    </div>
    <div class="field component-login_field">
      <label class="label component-login_label">{{ langs.login.password }}</label>
      <p class="control has-icons-left">
        <input class="input component-login_input" type="password" placeholder="*********" v-model="login_form.password" />
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'key']" />
        </span>
      </p>
    </div>
    <div class="field component-login_field">
      <a class="button is-primary component-login_button is-rounded" @click.prevent="login">{{ langs.login.log_in }}</a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "login-component",
  data() {
    return {
      login_form: {
        username: null,
        password: null
      }
    };
  },
  computed: {
    ...mapGetters({
      langs: "langVars",
      user: "getUser"
    })
  },
  mounted() {},
  methods: {
    login() {
      Meteor.loginWithPassword(
        this.login_form.username,
        this.login_form.password,
        result => {
          if (!result) {
            this.$store.dispatch("setUser", this.user);
            window.location = "/";
          }
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../scss/_variable";
.component-login {
  &_button {
    display: block;
    box-shadow: 0 8px 40px -8px #94d82d;
    margin-bottom: 30px;
    background: #94d82d;
    transition: 0.3s;

    &:hover {
      box-shadow: 0 12px 50px -8px #82c91e;
      background: #82c91e;
    }
  }
  &_label {
    font: 300 13px/1.5 $font-primary;
  }
  &_input {
    border: 0;
    box-shadow: 0 0 0;
    border-bottom: 1px solid rgb(219, 219, 219);
    border-radius: 0;
  }
  &_field {
    margin: 0 0 30px;
  }
}
</style>
