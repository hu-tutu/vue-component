import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state";
// import mutations from "./mutation";
// import actions from "./actions"
import createPersistedState from "vuex-persistedstate";
// import request from "axios";
// import {Message} from "element-ui";
import requests from './mutation'
import {Message} from "element-ui";
Vue.use(Vuex)

const mutations = {
  //  学科
  findSubjectObj: (state, data) => {
    requests.findSubject(data).then(res => {
      if (res.data.code == 0) {
        state.findSubject = res.data
      } else {
        Message({
          message: res.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  //  地区：
  findScreenAreaObj: (state, data) => {
    requests.findScreenArea(data).then(res => {
      if (res.data.code == 0) {
        state.findScreenArea = res.data
      } else {
        Message({
          message: res.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 年份：
  findScreenYearObj: (state, data) => {
    requests.findScreenYear(data).then(res => {
      if (res.data.code == 0) {
        state.findScreenYear = res.data
      } else {
        Message({
          message: res.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 学段：
  findScreenStudySectionObj: (state, data) => {
    requests.findScreenStudySection(data).then(res => {
      if (res.data.code == 0) {
        state.findScreenStudySection = res.data
      } else {
        Message({
          message: res.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 年级：
  findScreenGradeObj: (state,data) => {
    requests.findScreenGrade(data).then(res => {
      if (res.data.code == 0) {
        state.findScreenGrade = res.data
      } else {
        Message({
          message: res.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 学期：
  findScreenSemesterObj: (state, data) => {
    requests.findScreenSemester(data).then(res => {
      if (res.data.code == 0) {
        state.findScreenSemester = res.data
      } else {
        Message({
          message: res.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 图书系列：
  findScreenBrandObj:  (state, data) => {
    requests.findScreenBrand(data).then(res => {
      if (res.data.code == 0) {
        state.findScreenBrand = res.data
      } else {
        Message({
          message: res.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 教材版本：
  findTeachingMaterialObj: (state, data) =>  {
    requests.findTeachingMaterial(data).then(res => {
      if (res.data.code == 0) {
        state.findTeachingMaterial = res.data
      } else {
        Message({
          message: res.data.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
};

const actions = {
  getDetails: function ({commit}, data) {
    commit('getDetails', data)
  },
  findSubjectObj: function ({commit}, data) {
    commit('findSubjectObj', data)
  },
  findScreenAreaObj: function ({commit}, data) {
    commit('findScreenAreaObj', data)
  },
  findScreenYearObj: function ({commit}, data) {
    commit('findScreenYearObj', data)
  },
  findScreenStudySectionObj: function ({commit}, data) {
    commit('findScreenStudySectionObj', data)
  },
  findScreenGradeObj: function ({commit}, data) {
    commit('findScreenGradeObj', data)
  },
  findScreenSemesterObj: function ({commit}, data) {
    commit('findScreenSemesterObj', data)
  },
  findScreenBrandObj: function ({commit}, data) {
    commit('findScreenBrandObj', data)
  },
  findTeachingMaterialObj: function ({commit}, data) {
    commit('findTeachingMaterialObj', data)
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState({ storage: window.localStorage })]
})
