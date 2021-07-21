/*
 * @Author: your name
 * @Date: 2021-07-21 18:55:40
 * @LastEditTime: 2021-07-21 22:02:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-demo/algorithm/sort.js
 */
import { testSort, generateRandArr } from './common.js';

/**
 * 冒泡排序
 * 重复比较相邻的两个项
*/
function bubbleSort(arr = []) {
  let len = arr.length;
  // 外层循环 控制循环和比较总共多少轮
  for (let i = 0; i < len - 1; i++) {
    // 内层循环 控制重复的比较和交换
    // 优化点：加一个标识 如果在内循环中未出现交换，则代表已经是有序数组
    let flag = true;
    for (let j = 0; j < len - 1 - i; j++) {
      console.log(arr[j], '--arr[j]--')
      if(arr[j] > arr[j + 1]){
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = false;
      }
    }
    if(flag) break; // 如果未出现交换 则直接跳出循环 此时只循环了内层循环n次+外层循环1次
  }
  return arr;
}

const bubbleArr = generateRandArr(5, 0, 10);
console.log(bubbleArr, '--bubbleArr--');
testSort('bubbleSort', bubbleSort, bubbleArr);

/**
 * 选择排序
 * 找出最小值，进行位置互换
*/
function selectionSort(arr = []) {
  let len = arr.length;
  // 最小值索引
  let minIndex;
  for (let i = 0; i < len; i++) {
    minIndex = i;
    for (let j = i; j < len; j++) {
      if(arr[j] < arr[minIndex]){
        minIndex = j;
      }
    }
    if(minIndex !== i){
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr;
}

const selectionArr = generateRandArr(5, 0, 10);
console.log(selectionArr, '--selectionArr--');
testSort('selectionSort', selectionSort, selectionArr);

/**
 * 插入排序
 * 找到当前元素在它前面那个序列中的正确位置
*/
function insertSort(arr = []) {
  let len = arr.length;
  let tmp;
  for (let i = 1; i < len; i++) {
    tmp = arr[i];
    let j = i;
    for (j; j > 0 && arr[j - 1] > tmp; j --) {
      arr[j] = arr[j -1];
    }
    arr[j] = tmp;
  }
}

const insertArr = generateRandArr(5, 0, 10);
console.log(insertArr, '--insertArr--');
testSort('insertSort', insertSort, insertArr);
