<template lang="html">
  <div class="models-list-component">
    <h2 class="models-list-component_title" v-if="header" v-html="header"></h2>
    <ul class="models-list-component_list" :class="{'block': display == 'block'}">
      <li class="models-list-component_item" v-for="model in models" :key="model._id">
        <router-link :to="{ name: 'ModelPage', params: { slug: model.slug } }">
          <div class="models-list-component_image">
            <img :src="model.photo" :alt="model.name" />
            <span>{{ producer }}</span>
          </div>
          <p>
            {{ model.name }}
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "models-list-component",
  props: ["producer", "models", "header", "display"]
};
</script>

<style lang="scss">
@import "../../scss/_variable";

.models-list-component {
  &_title {
    font: 600 26px/1.3 $font-primary;
    color: #000;
    padding: 0 0 30px;
    span {
      font-weight: 400;
    }
  }
  &_list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    &.block {
      display: block;
      .models-list-component_item {
        margin: 0 0 25px;
      }
      .models-list-component_image {
        height: 120px;
        img {
          height: 140px;
        }
      }
    }
  }
  &_image {
    position: relative;
    height: 160px;
    overflow: hidden;
    img {
      height: 180px;
      width: auto;

      max-width: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    span {
      position: absolute;
      bottom: 5px;
      left: 5px;
      color: #fff;
    }
  }
  &_item {
    font: 600 14px/1.3 $font-primary;
    color: #000;
    a {
      color: #000;
      display: block;
      &:hover {
        color: #969696;
      }
    }
    p {
      margin: 0;
      padding: 0 5px;
    }
    img {
      display: block;
      //max-width: 80px;
      margin: 0 auto 5px;
    }
  }
}
</style>
