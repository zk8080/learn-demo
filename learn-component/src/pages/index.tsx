/*
 * @Author: your name
 * @Date: 2021-08-19 22:28:44
 * @LastEditTime: 2021-11-03 21:55:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-demo/learn-component/src/pages/index.tsx
 */
import { http } from '@/utils/request';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import useDebounce from '@/hooks/useDebounce';
import useThrottle from '@/hooks/useThrottle';
import useAsync from '@/hooks/useAsync';
import { Input } from 'zk-play-ui';
import './index.less';


const fn = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('RESOLVED');
  }, 1000);
});

const usePrevious = (preValue: any) => {
    const ref = useRef();
    useEffect(() => {
      console.log(preValue, '--preValue--');
        ref.current = preValue;
    }, [preValue])
    
    return ref.current;
}

export default function IndexPage() {

  const [count, setCount] = useState<number>(0);
  const preCount = usePrevious(count);
  const { data, isLoading, error } = useAsync(fn, []);
  console.log(count, '---count--');
  console.log(preCount, '--preCount--');
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
    // console.log(count, '--count--');
    setCount(c => c + 1);
  }, 1000,)

  
  return (          
    <div>
      <h1 className='title'>Page index</h1>
      {
        isLoading ? <div>loading</div>
          : error ? <div>{error}</div>
              : <div>value: {data}</div>
      }
      <Button
        onClick={handleClick}
      >
        点击
      </Button>
      {
        count
      }

      <div className='container'>
        容器
        <div className='parent'>
          父元素
          <div className='child'>
            <a href="">真的是</a>
            <button>测试</button>
            <span>测试</span>
            <span>打开卢萨卡就看到撒谎简单撒娇快点好萨科好的萨科结婚的吉萨大红色阿科技活动库萨大回馈睡觉啊好的看撒谎的空间撒谎的空间撒看到就好撒的哈萨克dsaks</span>
          </div>
        </div>
      </div>
      <Input 
        size="lg"
      />
    </div>
  );
}
