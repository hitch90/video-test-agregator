<template>
  <div v-if="langs" class="component-register">
    <b-notification type="is-success" v-if="register_send.success" :closable="false">
        {{ langs.login.register_success }}
    </b-notification>
    <b-notification type="is-danger" v-if="register_send.reason" :closable="false">
        {{ register_send.reason }}
    </b-notification>
    <template v-if="!register_form.success">
      <div class="field component-register_field">
        <label class="label component-register_label">{{ langs.login.username_register }}</label>
        <p class="control has-icons-left">
          <input class="input component-register_input" type="text" :placeholder="langs.login.username_register" v-model="register_form.username" />
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
        </p>
      </div>
      <div class="field component-register_field">
        <label class="label component-register_label">{{ langs.login.email }}</label>
        <p class="control has-icons-left">
          <input class="input component-register_input" type="email" :placeholder="langs.login.email" v-model="register_form.email" />
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </span> 
        </p>
      </div>
      <div class="field component-register_field">
        <label class="label component-register_label">{{ langs.login.password }}</label>
        <p class="control has-icons-left has-icons-right">
          <input class="input component-register_input" type="password" :placeholder="langs.login.password" v-model="register_form.password" />
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="['fas', 'key']" />
          </span>
          <span :class="`icon is-right ${isPasswordEq ? 'is-green' : 'is-red'}`">
              <font-awesome-icon :icon="['fas', 'check']" />
          </span>
        </p>
      </div>
      <div class="field component-register_field">
        <label class="label component-register_label">{{ langs.login.repeat_password }}</label>
        <p class="control has-icons-left has-icons-right">
          <input class="input component-register_input" type="password" :placeholder="langs.login.repeat_password" v-model="register_form.repeat_password" />
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="['fas', 'key']" />
          </span>
          <span :class="`icon is-right ${isPasswordEq ? 'is-green' : 'is-red'}`">
              <font-awesome-icon :icon="['fas', 'check']" />
          </span>
        </p>
      </div>
      <div class="field component-register_field">
        <a class="button is-primary is-rounded component-register_button" @click.prevent="register">{{ langs.login.register }}</a>
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "register-component",
  data() {
    return {
      register_form: {
        username: null,
        password: null,
        repeat_password: null,
        email: null,
        profile: {
          name: null,
          invited_by: null,
          account_balance: 5000,
          avatar: null
        }
      },
      register_send: {
        success: false,
        reason: null
      }
    };
  },
  computed: {
    ...mapGetters({
      langs: "langVars",
      user: "getUser"
    }),
    isPasswordEq() {
      return (
        this.register_form.password &&
        this.register_form.password === this.register_form.repeat_password
      );
    }
  },
  mounted() {},
  methods: {
    register() {
      if (
        !this.register_form.username ||
        !this.register_form.email ||
        !this.register_form.password ||
        !this.register_form.repeat_password
      ) {
        this.register_send.reason = "Uzupełnij wszystkie pola";
        return false;
      }
      Accounts.createUser(this.register_form, result => {
        if (!result) {
          this.register_send.success = true;
          this.register_send.reason = null;
        }
        if (result) {
          this.register_send.reason = result.reason;
        }
      });
    }
  },
  meteor: {
    user() {
      return Meteor.user();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../scss/_colors";
@import "../scss/_variable";
.component-register {
  &_button {
    display: block;
    box-shadow: 0 8px 40px -8px #339af0;
    margin-bottom: 30px;
    background: #339af0;
    transition: 0.3s;

    &:hover {
      box-shadow: 0 12px 50px -8px #1c7ed6;
      background: #1c7ed6;
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
    margin: 0 0 20px;
  }
  .is-red {
    color: $error-color;
  }
  .is-green {
    color: $success-color;
  }
}
</style>
