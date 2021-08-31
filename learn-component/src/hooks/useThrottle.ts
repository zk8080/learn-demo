import { useRef, useEffect, useCallback } from "react";

/*
 * @Author: your name
 * @Date: 2021-09-01 00:00:09
 * @LastEditTime: 2021-09-01 00:08:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-demo/learn-component/src/hooks/useThrottle.ts
 */

type Nullable<T> = T | null;

interface CbRef {
  fn: (...args: any[]) => any;
  timer: Nullable<ReturnType<typeof setTimeout>>;
}

// const useThrottle = <T extends (...args: any[]) => any>(fn: T, delay: number, dep = []) => {
//   const { current } = useRef<CbRef>({ fn, timer: null });
//   useEffect(function () {
//     current.fn = fn;
//   }, [fn]);

//   return useCallback((...args: any[]) => {
//     if (!current.timer) {
//       current.timer = setTimeout(() => {
//         current.timer = null;
//       }, delay);
//       current.fn.call(undefined, ...args);
//     }
//   }, dep);
// }

const useThrottle = <T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  deps = []
) => {
  const throttleRef = useRef({ fn, prev: 0 });
  throttleRef.current.fn = fn;

  return useCallback(
    (...args: any[]) => {
      const now = Date.now();

      if (now - throttleRef.current.prev >= wait) {
        throttleRef.current.fn.apply(undefined, args);
        throttleRef.current.prev = now;
      }
    },
    deps
  ) as T;
};

export default useThrottle;