/**
 * 生成随机数组
*/
export const generateRandArr = (len, min, max) => {
  return Array(len).fill(1).map(item => Math.floor(Math.random() * (max - min) + min))
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