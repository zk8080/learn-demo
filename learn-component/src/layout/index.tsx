import { setCookie } from '@/utils/cookie';
import React, { cloneElement, FC, isValidElement, useEffect, useState } from 'react';

const Layout: FC<{}> = (props) => {
  const { children } = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('全局layout')
  }, [])

  const handleClick = () => {
    setCount(c => c + 1)
    setCookie('test', '123');
  }

  return (
    <div>
      {count}
      <button onClick={handleClick}>修改全局动态</button>
      { React.Children.map(children, (element, i) => {
        return isValidElement(element) && cloneElement(element, { key: count})
      }) }
    </div>
  );
}

export default Layout;