<template lang="html">
  <div class="channels-list-component">
    <h2 class="channels-list-component_title" v-if="header" v-html="header"></h2>
    <ul class="channels-list-component_list">
      <li class="channels-list-component_item" v-for="channel in channels" :key="channel._id">
        <router-link :to="{ name: 'ChannelPage', params: { slug: channel.slug } }" class="channels-list-component_link">
          <div class="channels-list-component_image">
            <img :src="channel.photo" :alt="channel.name" />
            <!-- <span>{{ channel.producer.name }} {{ channel.model.name }}</span> -->
          </div>
          <p>
            {{ channel.name }}
          </p>
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

<style lang="scss">
@import "../../scss/_variable";

.channels-list-component {
  &_title {
    font: 600 26px/1.3 $font-primary;
    color: #000;
    padding: 0 0 30px;
    span {
      font-weight: 400;
    }
  }
  &_list {
    display: block;
  }
  &_image {
    width: 40px;
    border: 1px solid #969696;
    border-radius: 50%;
    height: 40px;
    img {
      border-radius: 50%;
      width: 38px;
      border: 2px solid #fff;
    }
  }
  &_link {
    font: 600 14px/1.3 $font-primary;
    color: #969696;
    display: flex;
    align-items: center;
    &:hover {
      color: #000;
    }
  }
  &_item {
    margin: 0 0 15px;
    p {
      margin: 0;
      padding: 0 0 0 15px;
      flex: 1;
    }
  }
}
</style>
