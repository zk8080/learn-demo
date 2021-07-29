import React, { ChangeEvent, useRef, useState } from 'react';
import './index.less';
import ClassNames from 'classnames';

export interface VerificationCodeProps {
  /**
   * 模式：方形 ｜ 下划线  默认方形
  */
  mode: 'box' | 'bottomLine';
  /**
   * 验证码位数
   */
  length: number;
  /**
   * 验证码绑定值
   */
  value?: string;
  /**
   * 是否自动获取焦点
  */
  focus?: boolean;
  /**
   * 输入完成事件
   */
  onFinish?: (val: string) => void;
}

function VerificationCode(props: VerificationCodeProps) {
  const { value = '', length = 4, onFinish, mode = 'bottomLine', focus = false } = props;
  
  // 根据传入的验证码位数，生成对应长度数组来初始化div
  const loopCharArr = useRef(new Array(length).fill(1));

  // 验证码数据
  const [inputVal, setInputVal] = useState(value.substring(0, length));
  // 是否聚焦
  const [inputFocus, setInputFocus] = useState(focus);
  
  // 输入验证码
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputVal(String(value).substring(0, length));
    // 如果输入值超出长度，则
    if (String(value).length > length) return;
    // 如果输入完成，则触发onFinish
    if (String(value).length === length) {
      console.log('验证码输入完成', value)
      onFinish?.(value);
    }
  }

  const ItemCls = ClassNames('verification-code--item', {
    'item-box': mode === 'box',
    'item-line': mode === 'bottomLine'
  })

  return (
    <div className="verification-code--wrapper">
      <input
        className="verification-code--input"
        type="number" 
        value={inputVal}
        onChange={handleInput}
        maxLength={length}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        autoFocus={inputFocus}
        pattern="\d*"
      />
      <div className='verification-code--container'>
        {
          loopCharArr.current.map((item, index) => {
            return (
              <div 
                className={ItemCls}
                key={index}
              >
                <span className='verification-code--value'>{inputVal[index]}</span>
                {
                  inputVal.length === index && inputFocus && <div className='verification-code--cursor'></div>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default VerificationCode;
