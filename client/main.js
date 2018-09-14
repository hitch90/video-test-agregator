//import '/imports/startup/client';

import Vue from "vue";
import { Meteor } from "meteor/meteor";
import VueRouter from "vue-router";
import VueMeteorTracker from "vue-meteor-tracker";
import routes from "/imports/startup/client/routes.js";
import App from "/imports/ui/App.vue";
import store from "/imports/ui/store/index";

/* font awesome */
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
fontawesome.library.add(solid);
import Buefy from "buefy";
import "buefy/lib/buefy.css";
Vue.use(Buefy);
Vue.use(VueRouter);
Vue.use(VueMeteorTracker);
Vue.prototype.AppInfo = Meteor.App;
Vue.component("font-awesome-icon", FontAwesomeIcon);

const router = new VueRouter({
  mode: "history",
  routes
});

Meteor.startup(() => {
  new Vue({
    el: "#app",
    store,
    render: h => h(App),
    router
  });
});
