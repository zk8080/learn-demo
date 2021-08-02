import React, { useEffect, useState } from 'react';
import './index.less';
import ClassNames from 'classnames';

const mockData = new Array(80).fill(1);

function Index() {

  const [show, setShow] = useState(true);

  useEffect(() => {
    let nav = document.querySelector('nav');
    let reference = document.querySelector(".scroll-item") as Element;
    console.log(reference, '--reference--');
    const myObserver = new IntersectionObserver(entries => {
      console.log(entries, '--entries--');
      let item = entries[0];
      console.log(item, '--item--');
      if(item.boundingClientRect.top < 40){
        console.log('可以吸顶了')
        setShow(false);
      }else{
        console.log('不需要吸顶')
        setShow(true);
      }
      // console.log(document.querySelector(".scroll-item")?.getBoundingClientRect().top, '--top--')
    }, {
      threshold: [0, 0.99, 1], // tips: 0.99 的目的是检测超出屏幕一点点立即往回滚的情况
      rootMargin: '-72px 0px', // 60px，目的是声明顶部有个60px的距离需要减掉
    })
    myObserver.observe(reference);
    return () => {
      myObserver.disconnect();
    }
  }, [])
  
  const headerCls = ClassNames('ceiling--header', {
    visible: show
  })

  const stickyCls = ClassNames('sticky-box', {
    top: !show
  })

  return (
    <div className="ceiling--wrapper">
      <div className={headerCls}>
        <div>
          占位内容
          <p>占位内容占位内容占位内容占位内容占位内容占位内容占位内容占位内容占位内容</p>
        </div>
      </div>
      <div className='scroll-container'>
        <div className={stickyCls}>
          我是占位内容
        </div>
        <div className="scroll-list">
          {
            mockData.map((item, index) => {
              return (
                <div key={index} className='scroll-item'>{index + 1}</div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Index;