import "./mutation";

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

export default actions