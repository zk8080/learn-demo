/*
 * @Author: your name
 * @Date: 2021-07-21 18:55:40
 * @LastEditTime: 2021-07-27 21:50:47
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
    for (let j = i + 1; j < len; j++) {
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


/**
 * 归并排序
 * 重复分割数组，直到每个数组只有一个元素，再两两合并有序数组 
*/ 

function mergeSort(arr = []) {
  const len = arr.length;
  // console.log(arr,'---arrorigin---')
  // 边界问题
  if(len <= 1){
    return arr;
  }
  // 重复分割
  // 分割下标
  const mid = Math.floor(len / 2);
  // 左边数组
  let leftArr = mergeSort(arr.slice(0, mid));
  // 右边数组
  let rightArr = mergeSort(arr.slice(mid, len));
  // 合并有序数组
  arr = mergeArr(leftArr, rightArr);
  return arr;
}

function mergeArr(arr1 = [], arr2 = []) {
  // 合并后的有序数组
  let res = [];
  const len1 = arr1.length;
  let len2 = arr2.length;
  // 左边数组遍历下标
  let i = 0;
  // 右边数组遍历下标
  let j = 0;

  while (i < len1 && j < len2) {
    if(arr1[i] < arr2[j]){
      res.push(arr1[i]);
      i ++;
    }else{
      res.push(arr2[j]);
      j ++;
    }
  }
  // 如果i或者j未遍历完成，则代表当前数组已经还有更大的数组未合并完成
  if(i < len1){
    return res.concat(arr1.slice(i));
  }else if(j < len2){
    return res.concat(arr2.slice(j));
  }
  return res;
}


const mergeArrTest = generateRandArr(4, 0, 10);
console.log(mergeArrTest, '--mergeArrTest--');
testSort('mergeSort', mergeSort, mergeArrTest);


/**
 * 快速排序 
*/
function quickSort(arr = [], l, r) {
  if(l > r) {
    return;
  }
  const p = patition(arr, l, r);
  console.log(p, '--p--');
  quickSort(arr, l, p - 1);
  quickSort(arr, p + 1, r);
}

function patition(arr = [], l, r) {
  // debugger;
  const v = arr[l];
  let j = l;

  for (let i = l + 1; i <= r; i++) {
    if(arr[i] < v){
      [arr[j + 1], arr[i]] = [arr[i], arr[j + 1]];
      j ++;
    }
  }
  [arr[l], arr[j]] = [arr[j], arr[l]];
  return j;
}

const quickArr = generateRandArr(10, 0, 100);
console.log(quickArr, '--quickArr--');
quickSort(quickArr, 0, 9)