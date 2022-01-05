import React, { forwardRef, useEffect, useRef, useState } from 'react';

interface IProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

interface ComProps extends IProps {
  customizeRef?: React.ForwardedRef<HTMLImageElement>
}

const RefCom = (props: ComProps) => {
  const { customizeRef, src, ...rest } = props;
  // 是否可见
  const [loaded, setLoaded] = useState<boolean>(false);

  // 图片ref
  const myRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    // 转发ref
    if(customizeRef && typeof customizeRef === "object") {
      customizeRef.current = myRef.current;
    }
    if(customizeRef && typeof customizeRef === 'function') {
      customizeRef(myRef.current);
    }

    if(!myRef.current) return;
    
    // 图片懒加载
    let intersectionObserver: IntersectionObserver = new IntersectionObserver((entries) => {
      // 定义DOM元素的可视状态发生变化后需要做些什么
      if (entries[0].isIntersecting) {
        // intersectionRatio大于0，代表监听的元素由不可见变成可见
        
        console.log(entries, '--entries--');
        if(myRef.current && intersectionObserver) {
          setLoaded(true);
           // 加载过后，后续无需继续观察img的可视状态，进行解绑操作
          intersectionObserver.unobserve(myRef.current);
          intersectionObserver.disconnect();
          // intersectionObserver = null;
        }
      }
    });
    console.log(myRef.current, '--myRef.current--');
    // 监听target元素的可见性
    intersectionObserver.observe(myRef.current);
    return () => {
      if (intersectionObserver && myRef.current) {
        intersectionObserver.unobserve(myRef.current);
        intersectionObserver.disconnect();
        // intersectionObserver = null;
      }
    };
   
  }, [src])
  console.log(loaded, '--loaded--');
  return (
    <img {...rest} src={loaded ? src : undefined} ref={myRef} />
  );
}


const ForwardRefIndex = forwardRef<HTMLImageElement, IProps>(( props,ref )=><RefCom  {...props} customizeRef={ref}  />)

export default ForwardRefIndex;