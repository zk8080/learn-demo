/*
 * @Author: your name
 * @Date: 2021-03-21 17:24:36
 * @LastEditTime: 2021-03-21 21:36:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scroll-nav/src/pages/list-view/index.tsx
 */
import React, { useEffect, useRef, TouchEvent, useState } from 'react';
import './index.less';
import { SearchBar } from 'antd-mobile';
import { dataArr } from './data';
import BetterScroll from '@better-scroll/core';

function Index(props: {}) {
  const bScroll = useRef<any>();
  const [currentIdx, setCurrentIdx] = useState<number>(-1);
  const [currentNav, setCurrentNav] = useState<any>(null);
  // 点击字母导航
  const handleNavTouch = (obj: any): void => {
    const {title} = obj;
    setCurrentNav(obj);
    bScroll.current.scrollToElement(`.item-${title}`)
  }

  // 处理导航touch
  const handleTouchMove = (e: TouchEvent) => {
    // console.log(e)
    e.persist();
    const arrLen = dataArr.length;
    const currentTouch = e.touches[0];
    const { pageY } = currentTouch;
    const { height = 0, top = 0 } = document.querySelector(".list-view--nav>ul")?.getBoundingClientRect() || {};
    const offsetTop = height + top - pageY;
    const itemHeight = height / arrLen;
    const index = arrLen - ((offsetTop / itemHeight) | 0) - 1;
    if(index < 0 || index >= arrLen){
      setCurrentIdx(-1);
      setCurrentNav(null);
      return;
    }
    if(index !== currentIdx){
      setCurrentIdx(index);
      setCurrentNav(dataArr[index]);
      handleNavTouch(dataArr[index]);
    }
  }

  // 处理导航介乎
  const handleTouchEnd = (e: TouchEvent) => {
    console.log('触摸结束', '---触摸结束--');
    setCurrentNav(null);
    setCurrentIdx(-1);
  }

  useEffect(() => {
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }, {passive: false}); //passive 参数不能省略，用来兼容ios和android
    let bs = new BetterScroll('.list-view--scroll', {
      // movable: true,
      // zoom: true
    })
    bScroll.current = bs;
  }, [])
  return (
    <div className='list-view--wrapper'>
      <SearchBar />
      <div className='list-view--container'>
        <div className='list-view--scroll'>
          <ul>
            {
              dataArr.map((item, index) => {
                const { list, title } = item;
                return (
                  <li key={index}>
                    <h2 className={`item-${title}`}>{title}</h2>
                    <div className='scroll-item--wrapper'>
                      {
                        list.map((listItem, idx) => {
                          return (
                            <span key={idx}>{listItem.name}</span>
                          )
                        })
                      }
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className='list-view--nav'>
          <ul>
            {
              dataArr.map((item, index) => {
                const {title} = item;
                return (
                  <li 
                    key={index}
                    className='nav-item'
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchStart={() => {handleNavTouch(item)}}
                  >
                    <h2>{title}</h2>
                    {
                      currentNav && currentNav.title === title && <span className='current-nav'>
                        {currentNav.title}
                      </span>
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Index;