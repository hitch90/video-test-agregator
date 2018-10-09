<template>
  <div :class="`app ${user ? 'is-login' : ''}`">
    <header-component></header-component>
    <transition name="slide-left" mode="out-in">
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </transition>
    <footer class="footer">
      <div class="wrapper">
        <p>
          Nasza strona internetowa używa plików cookies (tzw. ciasteczka) w celach statystycznych, reklamowych oraz funkcjonalnych. Dzięki nim możemy indywidualnie dostosować stronę do twoich potrzeb. Każdy może zaakceptować pliki cookies albo ma możliwość wyłączenia ich w przeglądarce, dzięki czemu nie będą zbierane żadne informacje. <a rel="nofollow4wr" href="http://ciasteczka.eu/#jak-wylaczyc-ciasteczka">Dowiedz się więcej jak je wyłączyć</a>.
        </p>
        <p>
          <strong>Autodium.pl</strong> jest agregatorem video testów z Youtube samochodów najpopularniejszych marek, m.in.: <strong>Audi</strong>, <strong>BMW</strong>, <strong>Hyundai</strong>, <strong>Renault</strong>, <strong>Opel</strong>, <strong>Kia</strong>, <strong>Ford</strong>, <strong>Alfa Romeo</strong> i wiele innych. Testy pochodzą z kanałów z serwisu Youtube.
        </p>
      </div>
    </footer>
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
.footer {
  border-top: 1px solid #e6e6e6;
  background: transparent;
  padding: 0;
  margin: 0;
  p {
    color: #7c7c7c;
    font: 400 12px/1.6 $font-secondary;
    & + p {
      margin-top: 15px;
    }
    a {
      color: #000;
    }
  }
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
