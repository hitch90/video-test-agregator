import Vue from "vue";
import Vuex from "vuex";
import lang_pl from "../lang/pl";
import lang_en from "../lang/en";
import isUser from "../helpers/isUser";
Vue.use(Vuex);

const state = {
  langs: {
    selected: "pl",
    available: [
      {
        name: "Polski",
        id: "pl"
      },
      {
        name: "English",
        id: "en"
      }
    ],
    vars: lang_pl
  },
  user: null,
  filters: null,
  querystring: null
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setLang(state, lang) {
    switch (lang) {
      case "en":
        state.langs.vars = lang_en;
        break;
      case "pl":
        state.langs.vars = lang_pl;
        break;
      default:
        state.langs.vars = lang_en;
    }
  },
  setUser(state, user) {
    state.user = user;
  },
  updateQuery(state, query) {
    state.querystring = query;
  }
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  setLang: ({ commit }, lang) => commit("setLang", lang),
  setUser: ({ commit }, user) => commit("setUser", user)
};

// getters are functions
const getters = {
  langVars: state => state.langs.vars,
  getUser: state => state.user
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
