<template>
  <div class="component-user-nav">
    <a href="#" class="component-user-nav_add" @click.prevent="">
      <font-awesome-icon :icon="['fas', 'plus']" />
    </a>
    <b-dropdown v-if="user">
      <button class="component-user-nav_button" slot="trigger">
          {{ langs.user_nav.hello }},
          <span class="component-user-nav_name"> {{ user.username }}</span>
          <span class="component-user-nav_icon">
            <font-awesome-icon :icon="['fas', 'angle-down']" />
          </span>
      </button>
      <b-dropdown-item>{{ langs.user_nav.my_profile }}</b-dropdown-item>
      <b-dropdown-item>{{ langs.user_nav.settings }}</b-dropdown-item>
      <b-dropdown-item v-if="user.username == 'admin'">
        <router-link :to="{ name: 'AdminHomepage' }">{{ langs.user_nav.admin }}</router-link>
      </b-dropdown-item>
      <b-dropdown-item><a href="#" @click.prevent="logout">{{ langs.user_nav.logout }}</a></b-dropdown-item>
    </b-dropdown>
    <div class="component-user-nav_account" v-if="user == null">
      <font-awesome-icon :icon="['fas', 'user']" />
      <router-link class="component-user-nav_link login" :to="{ name: 'login'}">
          {{ langs.nav_bar.login }}
      </router-link>
      <router-link class="component-user-nav_link" :to="{ name: 'register'}">
          {{ langs.nav_bar.register }}
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "user-nav-component",
  computed: {
    ...mapGetters({
      langs: "langVars",
      user: "getUser"
    })
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    logout() {
      Meteor.logout(error => {
        if (!error) {
          window.location = "/";
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/_variable";
@import "../../scss/_colors";
.component-user-nav {
  display: flex;
  align-items: center;
  &_add {
    background: #ce3a42;
    border-radius: 50%;
    display: inline-block;
    padding: 0;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 21px;
    font-size: 9px;
    color: #fff;
    margin-right: 10px;
  }
  &_button {
    font: 500 14px/35px $font-primary;
    border: 0;
    outline: 0;
    cursor: pointer;
    &:hover {
      background: $brand-secondary;
      border-radius: 4px;
      color: #fff;
    }
  }
  &_name {
    font-weight: 800;
  }
  &_icon {
    position: relative;
    top: 2px;
    color: $brand-primary;
    margin-left: 10px;
    font-size: 18px;
    line-height: 35px;
  }
  &_account {
    position: relative;
    padding-left: 40px;
    svg {
      position: absolute;
      top: 50%;
      left: 0;
      font-size: 26px;
      margin-top: -13px;
    }
  }
  &_link {
    border: 0;
    font: 400 14px/1.3 $font-primary;
    display: block;
    margin: 0 0 5px;
    color: $brand-secondary;
    &.login {
      color: $brand-secondary;
    }
  }
}
</style>
