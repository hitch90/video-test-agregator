<template>
  <div class="about-page">
    <div class="about-page_section">
      <h2 class="about-page_title">
        Jak powstało i czym jest Autodium?
      </h2>
      <p>
        Poszukując nowego samochodu przemierzałem internet w poszukiwaniu testów, żeby poznać różne opinie i odczucia innych osób. Musiałem poświęcić dość sporo czasu, żeby zapoznać się z wszystkimi dostępnymi materiałami, przy czym nie każdy był wart uwagi - a to materiał sponsorowany, albo porównania samochodów z różnych półek cenowych, albo brak konkretów.<br /><br />
        Wtedy właśnie zrodził się pomysł na agregator testów, miejsce w którym zostaną zebrane testy nowych samochodów, ale tylko takie które są warte zobaczenia.<br /><br />
        Staram się tworzyć przejrzystą, poukładaną bazę testów bazując na filmach umieszczonych na Youtube, oraz treściach dostępnych na innych stronach (wkrótce!).
      </p>
    </div>
    <div class="about-page_section">
      <h3 class="about-page_subtitle">
        Sprawdź testy samochodów
      </h3>
      <ul class="about-page_list column-2">
        <li v-for="producer in producers">
          <router-link :to="{ name: 'ProducerPage', params: { slug: producer.slug } }">
            Testy {{ producer.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="about-page_section full">
      <h3 class="about-page_subtitle">
        Samochody, których testy zobaczysz u nas
      </h3>
      <ul class="about-page_list column-4">
        <li v-for="model in models">
          <router-link :to="{ name: 'ModelPage', params: { slug: model.slug } }">
              <template v-for="producer in producers">
                <span v-if="producer._id == model.producer">
                  {{ producer.name }}
                </span>
              </template>
              {{ model.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="about-page_section full">
      <h3 class="about-page_subtitle">
        Kanały z których filmy znajdziesz na Autodium.pl
      </h3>
      <ul class="about-page_list column-4">
        <li v-for="channel in channels">
          <router-link :to="{ name: 'ChannelPage', params: { slug: channel.slug } }">
            {{ channel.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "about-page",
  computed: {
    ...mapGetters({
      langs: "langVars"
    })
  },
  components: {},
  data() {
    return {
      producers: null,
      models: null,
      channels: null
    };
  },
  head: {
    title() {
      return {
        inner: "O nas"
      };
    }
  },
  mounted() {
    Meteor.call("producers.all", (error, result) => {
      this.producers = result;
    });
    Meteor.call("models.all", (error, result) => {
      this.models = result;
    });
    Meteor.call("channels.all", (error, result) => {
      this.channels = result;
    });
  }
};
</script>
<style lang="scss" scoped>
@import "./scss/_variable";
@import "./scss/_colors";
.about-page {
  padding: 20px 0;
  @include media($tablet-big) {
    padding: 50px 0;
    display: flex;
    flex-wrap: wrap;
  }
  &_section {
    width: 50%;
    padding: 30px 0;
    &.full {
      width: 100%;
      border-top: 1px solid #e6e6e6;
      padding: 30px 0 30px;
    }
  }
  &_title {
    font: 600 18px/1.3 $font-tertiary;
    color: #000;
    padding: 0 0 15px;
    @include media($tablet-big) {
      padding: 0 0 30px;
      font: 600 26px/1.3 $font-tertiary;
    }
  }
  &_subtitle {
    font: 600 15px/1.3 $font-tertiary;
    color: #000;
    padding: 0 0 15px;
    @include media($tablet-big) {
      padding: 0 0 30px;
      font: 600 20px/1.3 $font-tertiary;
    }
  }
  p {
    font: 400 15px/1.8 $font-secondary;
    & + p {
      margin: 20px 0 0;
    }
  }
  &_list {
    a {
      color: #000;
      font: 600 15px/2 $font-primary;
    }
    &.column-4 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-column-gap: 30px;
      grid-row-gap: 10px;
    }
    &.column-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 30px;
    }
  }
}
</style>
