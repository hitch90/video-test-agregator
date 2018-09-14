<template>
  <div class="page-register">
    <div class="columns is-centered">
      <div class="column is-3 page-register_column">
        <header class="page-register_header">

        </header>
        <register-component class="page-register_content" />
        <footer class="page-register_footer">
          <router-link class="page-register_footerLink"
            :to="{ name: 'login'}">
            Have an account? <strong>Log In!</strong>
          </router-link>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import RegisterComponent from "./front/RegisterComponent";
export default {
  name: "register-page",
  components: {
    RegisterComponent
  }
};
</script>
<style lang="scss" scoped>
@import "./scss/_variable";
.page-register {
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
