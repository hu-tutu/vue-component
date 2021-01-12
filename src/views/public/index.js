/*
 * 图书参数相关请求接口，它包括：
 * 1、学科
 * 2、地区
 * 3、年份
 * 4、学段
 * 5、年级
 * 6、学期
 * 7、图书系列
 * 8、教材版本
 */

import request from '@/router/axios'

/*
 * 学科：
 */
export function findSubjectObj (data) {
  return request({
    url: '/admin/bnczParameter/findScreenSubject',
    method: 'post',
    data: data
  })
}
/*
 * 地区：
 */
export function findScreenAreaObj (data) {
  return request({
    url: '/admin/bnczParameter/findScreenArea',
    method: 'post',
    data: data
  })
}
/*
 * 年份：
 */
export function findScreenYearObj (data) {
  return request({
    url: '/admin/bnczParameter/findScreenYear',
    method: 'post',
    data: data
  })
}
/*
 * 学段：
 */
export function findScreenStudySectionObj (data) {
  return request({
    url: '/admin/bnczParameter/findScreenStudySection',
    method: 'post',
    data: data
  })
}
/*
 * 年级：
 */
export function findScreenGradeObj (data) {
  return request({
    url: '/admin/bnczParameter/findScreenGrade',
    method: 'post',
    data: data
  })
}
/*
 * 学期：
 */
export function findScreenSemesterObj (data) {
  return request({
    url: '/admin/bnczParameter/findScreenSemester',
    method: 'post',
    data: data
  })
}
/*
 * 图书系列：
 */
export function findScreenSemesterObj (data) {
  return request({
    url: '/admin/bnczParameter/findScreenBrand',
    method: 'post',
    data: data
  })
}
/*
 * 教材版本：
 */
export function findScreenSemesterObj (data) {
  return request({
    url: '/admin/bnczParameter/findScreenTextbookEdition',
    method: 'post',
    data: data
  })
}

