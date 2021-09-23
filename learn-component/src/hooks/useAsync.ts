import React, { useState, useCallback, useEffect } from "react";

/*
 * @Author: your name
 * @Date: 2021-09-15 23:35:14
 * @LastEditTime: 2021-09-15 23:52:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-demo/learn-component/src/hooks/useAsync.ts
 */
interface AsyncData<T> {
	data: T | null;
	isLoading: boolean;
	error: any;
} 



const useAsync = <T>(
  fn: () => Promise<T>,
  deps: any[]
): AsyncData<T> => {
  const [data, setData] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const callback = React.useCallback(() => {
    setIsLoading(true);
    return fn().then((response: T) => {
        setIsLoading(false);
        setData(response);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setError(error);
      });
  }, deps);

  useEffect(() => {
    callback();
  }, [callback]);

  return {
    data,
    isLoading,
    error,
  };
};



export default useAsync;