<template lang="html">
  <div class="channels-list-component">
    <h2 class="channels-list-component_title" v-if="header" v-html="header"></h2>
    <ul class="channels-list-component_list">
      <li class="channels-list-component_item" v-for="channel in channels" :key="channel._id">
        <router-link
          :to="{'name': 'ChannelPage', params: { slug: channel.slug } }"
          class="channels-list-component_link">
          <div class="channels-list-component_image">
            <img :src="channel.photo" alt="Placeholder image">
          </div>
          <div class="channels-list-component_content">
            <p class="channels-list-component_name">{{ channel.name }}</p>
            <div class="channels-list-component_desc" v-html="channel.description.substr(0, 100) + '...'" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "channels-list-component",
  props: ["channels", "header", "items"]
};
</script>

<style lang="scss" scoped>
@import "../../../scss/_variable";

.channels-list-component {
  &_title {
    font: 600 26px/1.3 $font-tertiary;
    color: #000;
    padding: 0 0 30px;
    span {
      font-weight: 400;
    }
  }
  &_link {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
    transition: 0.3s;
    &:hover {
      box-shadow: 0 0 5px #4875d5;
    }
  }
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
    color: #969696;
    font: 400 11px/1.3 $font-secondary;
  }
}
</style>
