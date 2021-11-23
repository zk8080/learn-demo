import React, {useEffect} from 'react';

function test(props) {
  useEffect(() => {
    console.log('---子组件重新渲染---')
  }, [])
  return (
    <div>
      我是子组件
    </div>
  );
}

export default test;