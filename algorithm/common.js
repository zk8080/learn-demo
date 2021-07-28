/*
 * @Author: your name
 * @Date: 2021-07-21 18:36:31
 * @LastEditTime: 2021-07-28 22:18:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-demo/algorithm/common.js
 */
// 生成一个[min, max]之间的随机数
export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)  + min);
}

/**
 * 生成随机数组
*/
export const generateRandArr = (len, min, max) => {
  return Array(len).fill(1).map(item => random(min, max))
}


/**
 * 测试时长
*/
export const testSort = (testName, testFn, testData) => {
  const startDate = new Date().getTime();
  console.log(startDate, '--startDate-')
  testFn(testData);
  const endDate = new Date().getTime();
  console.log(endDate, '--endDate-')

  console.log(`${testName}测试时长 ${endDate - startDate} \r\n`)
}

// 数组切换位置
export const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}