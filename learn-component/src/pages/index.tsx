/*
 * @Author: your name
 * @Date: 2021-08-19 22:28:44
 * @LastEditTime: 2021-09-01 00:08:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-demo/learn-component/src/pages/index.tsx
 */
import styles from './index.less';
import { http } from '@/utils/request';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import useDebounce from '@/hooks/useDebounce';
import useThrottle from '@/hooks/useThrottle';

export default function IndexPage() {

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const res = await http.get<string>('/test', {params: {a: 1}});
      console.log(res.data)
      console.log(res, '---res--');
    }
    getData();
  }, [])

  const handleClick = useThrottle(() => {
    // console.log('1233');
    console.log(count, '--count--');
    setCount(c => c + 1);
  }, 1000,)

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>

      <Button
        onClick={handleClick}
      >
        点击
      </Button>
      {
        count
      }
    </div>
  );
}
