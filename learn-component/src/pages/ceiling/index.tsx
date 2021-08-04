import React, { useEffect, useState, useRef } from 'react';
import './index.less';
import ClassNames from 'classnames';
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup);


function Index() {
  const BScrollRef = useRef<any>();

  const [show, setShow] = useState(true);
  const [isPullUpLoad, setIsPullUpLoad] = useState(false);
  const [mockData, setMockData] = useState(new Array(20).fill(1))

  async function pullingUpHandler() {
    setIsPullUpLoad(true)
    await requestData()

    BScrollRef.current.finishPullUp()
    BScrollRef.current.refresh()
    setIsPullUpLoad(false)
  }
  async function requestData() {
    try {
      const newData = await ajaxGet(/* url */)
      // 使用函数数setState可以获取最新的state值
      setMockData((mock) => [...mock, ...new Array(newData).fill(1)]);
    } catch (err) {
      // handle err
      console.log(err)
    }
  }

  function ajaxGet(/* url */) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20)
      }, 1000)
    })
  }

  useEffect(() => {
    BScrollRef.current = new BScroll('.scroll-container', {
      pullUpLoad: true,
      specifiedIndexAsContent: 1,
      // probeType: 3
    })

    BScrollRef.current.on('pullingUp', pullingUpHandler)
    return () => {
      BScrollRef.current.destroy();
    }
  }, [])
  
  useEffect(() => {
    let nav = document.querySelector('nav');
    let reference = document.querySelector(".scroll-item") as Element;
    // console.log(reference, '--reference--');
    const myObserver = new IntersectionObserver(entries => {
      // console.log(entries, '--entries--');
      let item = entries[0];
      // console.log(item, '--item--');
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
          <div className="pullup-tips">
            {
              isPullUpLoad && 'Loading...'
            }
            {
              !isPullUpLoad && '加载更多'
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;