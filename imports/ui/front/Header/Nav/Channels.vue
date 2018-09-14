<template lang="html">
  <div v-if="open == 'channel'">
    <div class="component-nav_subNavWrapper">
      <div class="component-nav_subNavContent channels" v-if="channels">
        <div v-for="channel in channels" class="channel-component">
          <div class="channel-component_image">
            <img :src="channel.photo" alt="Placeholder image">
          </div>
          <div class="channel-component_content">
            <p class="channel-component_name">{{ channel.name }}</p>
            <div class="channel-component_desc" v-html="channel.description.substr(0, 100) + '...'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "component-nav-channels",
  props: ["channels", "open"]
};
</script>

<style lang="scss">
@import "../../../scss/_variable";

.channel-component {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  &_image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #4875d5;
    overflow: hidden;
    img {
      display: block;
      border-radius: 50%;
      width: 48px;
      border: 2px solid #fff;
    }
  }
  &_content {
    flex: 1;
    padding: 0 10px;
  }
  &_name {
    font: 600 14px/1.3 $font-primary;
    color: #000;
    margin-bottom: 5px;
  }
  &_desc {
    font: 400 11px/1.3 $font-secondary;
  }
}
</style>
