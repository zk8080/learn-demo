import { useCallback, useEffect, useRef } from "react";

/*
 * @Author: your name
 * @Date: 2021-08-31 23:26:39
 * @LastEditTime: 2021-09-01 00:06:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-demo/learn-component/src/hooks/useDebounce.ts
 */

type Nullable<T> = T | null;

interface CbRef {
  fn: (...args: any[]) => any;
  timer: Nullable<ReturnType<typeof setTimeout>>;
}

const useDebounce = <T extends (...args: any[]) => any>(fn: T, wait: number, deps = []) => {
  const DebounceRef = useRef<CbRef>({ fn, timer: null });
  DebounceRef.current.fn = fn;

  return useCallback(
    (...args: any[]) => {
      if (DebounceRef.current.timer) {
        clearTimeout(DebounceRef.current.timer);
      }

      DebounceRef.current.timer = setTimeout(() => {
        // DebounceRef.current.fn!(...args);

        DebounceRef.current.fn.apply(undefined, args);
        DebounceRef.current.timer = null;
      }, wait);
    },
    [deps]
  ) as T;
}
export default useDebounce;