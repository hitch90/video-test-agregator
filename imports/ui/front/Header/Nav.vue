<template>
  <nav class="component-nav">
    <ul class="component-nav_list">
      <li class="component-nav_listItem">
        <a class="component-nav_link" href="#" @click.prevent="openMenu('model')">Auta</a>
      </li>
      <li class="component-nav_listItem">
        <a class="component-nav_link" href="#" @click.prevent="openMenu('channel')">Kanały</a>
      </li>
    </ul>
    <producers-component class="component-nav_subNav" :producers="producers" :open="open" />
    <channels-component class="component-nav_subNav" :channels="channels" :open="open" />
  </nav>
</template>

<script>
import { getProducers } from "../../helpers/getters";
import ChannelsComponent from "./Nav/Channels";
import ProducersComponent from "./Nav/Producers";
export default {
  name: "nav-component",
  components: {
    ChannelsComponent,
    ProducersComponent
  },
  data() {
    return {
      producers: null,
      channels: null,
      open: ""
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      Meteor.call("producers.all", (error, result) => {
        this.producers = result;
      });
      Meteor.call("channels.all", (error, result) => {
        this.channels = result;
      });
    },
    openMenu(type) {
      if (this.open == type) {
        this.open = "";
      } else {
        this.open = type;
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../scss/_variable";
.component-nav {
  &_subNav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 0;
    background: #f8f8f8;
    &Wrapper {
      max-width: 1200px;
      margin: 0 auto;
      //padding-left: 200px;
      display: flex;
    }
    &List {
      width: 200px;
      padding: 10px 0;
    }
    &ListLink {
      display: block;
      color: #000;
      font: 600 14px/1.3 $font-primary;
      padding: 8px 0;
      transition: all 0.3s;
      &:hover,
      &.active {
        background: #fff;
        padding: 8px 10px;
      }
    }
    &Content {
      flex: 1;
      &.producers {
        background: #fff;
      }
      &.channels {
        padding: 20px 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
      }
    }
  }
  &_list {
    display: flex;
    &Item {
      padding: 5px;
    }
  }
  &_link {
    padding: 5px;
    color: #000;
    font: 600 14px/1.3 $font-primary;
  }
}
</style>
