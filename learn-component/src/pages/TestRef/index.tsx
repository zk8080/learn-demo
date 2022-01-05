import React, { useEffect, useRef } from 'react';
import RefCom from './component/refCom';
import './index.less';

function Index() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  useEffect(() => {
    console.log(imgRef.current, '--imgRef--');
    if(imgRef.current) {
      imgRef.current.style.height = '300px';
    }
    
  }, [])
  return (
    <div className="test-ref--wrapper">
      <RefCom ref={imgRef} src={"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e5a1a8657c74478becca7b4157a8e33~tplv-k3u1fbpfcp-no-mark:280:280:200:280.awebp"}/>
      <RefCom src={"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1646d797b8c34de6b4d323657f430635~tplv-k3u1fbpfcp-no-mark:280:280:200:280.awebp"}/>
      <RefCom src={"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e5a1a8657c74478becca7b4157a8e33~tplv-k3u1fbpfcp-no-mark:280:280:200:280.awebp"}/>
      <RefCom src={"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4cb15cbaa9746acba4ee6c0df65021d~tplv-k3u1fbpfcp-no-mark:280:280:200:280.awebp"}/>
    </div>
  );
}

export default Index;