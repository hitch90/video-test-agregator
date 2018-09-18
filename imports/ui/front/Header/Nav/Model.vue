<template lang="html">
  <li class="nav-model">
    <router-link class="nav-model_link" :to="{ name: 'ModelPage', params: { slug: model.slug } }">
      <div class="nav-model_image">
        <img :src="model.photo" :alt="model.name"  />
        <span class="nav-model_name">
          {{ model.name }}
        </span>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "nav-model-component",
  props: ["model"]
};
</script>

<style lang="scss">
@import "../../../scss/_variable";

.nav-model {
  &_link {
    color: #000;
    display: block;
    &:hover {
      color: #969696;
      img {
        transform: translateX(-50%) translateY(-50%) scale(1.1);
      }
    }
  }
  &_name {
    position: absolute;
    bottom: 5px;
    left: 5px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
    padding: 2px 5px;
    border-radius: 2px;
    font: 600 14px/1.3 $font-primary;
  }
  &_image {
    height: 160px;
    overflow: hidden;
    position: relative;
    img {
      position: absolute;
      filter: grayscale(0);
      transition: 0.3s;
      top: 50%;
      left: 50%;
      height: 180px;
      max-width: none;
      transform: translateX(-50%) translateY(-50%);
    }
  }
}
</style>
