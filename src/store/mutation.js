import request from '@/router/axios'
// import state from "./state";
// import request from "axios";

const mutations = {
  //  学科
  findSubject: (state, data) => request({url: '/admin/bnczParameter/findScreenSubject', method: 'post', data: data }),
  //  地区：
  findScreenArea: (state, data) => request({url: '/admin/bnczParameter/findScreenArea',method: 'post',data: data}),
  // 年份：
  findScreenYear: (state, data) => request({url: '/admin/bnczParameter/findScreenYear',method: 'post',data: data}),
  // 学段：
  findScreenStudySection: (state, data) => request({url: '/admin/bnczParameter/findScreenStudySection',method: 'post',data: data}),
  // 年级：
  findScreenGrade: (state,data) => request({url: '/admin/bnczParameter/findScreenGrade',method: 'post',data: data }),
  // 学期：
  findScreenSemester: (state, data) => request({ url: '/admin/bnczParameter/findScreenSemester',method: 'post',data: data}),
  // 图书系列：
  findScreenBrand:  (state, data) => request({url: '/admin/bnczParameter/findScreenBrand',method: 'post',data: data }),
  // 教材版本：
  findTeachingMaterial: (state, data) =>  request({url: '/admin/bnczParameter/findScreenTextbookEdition',method: 'post',data: data}),
}

export default mutations;