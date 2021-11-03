/*
 * @Author: your name
 * @Date: 2021-11-03 21:55:28
 * @LastEditTime: 2021-11-03 22:32:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn-demo/learn-component/src/pages/reducerTest/index.tsx
 */
import React, { Reducer, useReducer } from 'react';

// type ActionMap<M extends { [index: string]: any }> = {
//   [Key in keyof M]: M[Key] extends undefined
//     ? {
//         type: Key
//       }
//     : {
//         type: Key
//         payload: M[Key]
//       }
// }

// enum Types {
//   Name = 'Change_Name',
//   Age = 'Change_Age',
// }

// type StateType = {
//   name: string;
//   age: number;
// }

// type PayloadType = {
//   [Types.Name]: string;
//   [Types.Age]: number;
// }

// type Action = ActionMap<PayloadType>[keyof ActionMap<PayloadType>]

// const initialState = {
//   name: '小明',
//   age: 18
// }

// const reducerAction: Reducer<StateType, Action> = (
//   state,
//   action,
// ) => {
//   switch (action.type) {
//     case Types.Name:
//       return { ...state, name: action.payload };
//     case Types.Age:
//       return { ...state, age: action.payload };
//     default:
//       return state;
//   }
// };
type StateType = {
  name: string;
  age: number;
}

const initialState = {
  name: '小明',
  age: 18
}

const simpleReducer = (prevState: StateType, updatedProperty: Partial<StateType>): StateType => ({
  ...prevState,
  ...updatedProperty
})

function ReducerTest() {
  const [state, setState] = useReducer(simpleReducer, initialState);
  return (
    <div>
      <div>姓名：{state.name}</div>
      <div>年龄：{state.age}</div>
      <button
        onClick={() => {
          setState({
            name: '小李'
          })
        }}
      >
        修改姓名
      </button>
    </div>
  );
}

export default ReducerTest;