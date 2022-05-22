import { Input } from 'zk-play-ui';
import { JSXComponent } from "@formily/core";
import { ColumnProps } from 'antd/lib/table'
import { SchemaEnum, SchemaReaction } from '@formily/react';

export interface IComponentType {
  Input: JSXComponent,
  Select: JSXComponent,
  DatePicker: JSXComponent,
  NumberPicker: JSXComponent,
  ['Input.TextArea']: JSXComponent,
}

export interface EditColunms<T = any> extends ColumnProps<T> {
  editType?: keyof IComponentType,
  componentProps?: any,
  validator?: any,
  required?: boolean;
  dataSource?: SchemaEnum<any>,
  reactions?: SchemaReaction<any>,
  scope?: any
}