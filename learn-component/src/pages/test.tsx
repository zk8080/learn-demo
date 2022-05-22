// import React, {useEffect} from 'react';

import { forwardRef, useRef, useImperativeHandle } from "react";

// function test(props) {
//   useEffect(() => {
//     console.log('---子组件重新渲染---')
//   }, [])
//   return (
//     <div>
//       我是子组件
//     </div>
//   );
// }

// export default test;

interface FancyProps {}

interface FancyRef {
  focus: () => void;
}

const FancyInput = forwardRef<FancyRef, FancyProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));
  return (
    <input ref={inputRef} {...props} />
  );
})

const Parent = () => {
  // 定义子组件ref
  const inputRef = useRef<FancyRef>(null);
  return (
    <div>
      <FancyInput 
        ref={inputRef}
      />
      <button 
        onClick={() => {
          // 调用子组件方法
          inputRef.current?.focus();
        }}
      >聚焦</button>
    </div>
  )
}