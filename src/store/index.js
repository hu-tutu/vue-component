import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

const mutations = {};

const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState({ storage: window.localStorage })]
})
