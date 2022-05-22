import React from 'react';
import EditableForm from './table';
import { EditColunms, IComponentType } from './index.d';
import moment from 'antd/node_modules/moment';

function Index() {

  const getAge = (val: moment.Moment) => {
    if(val) {
      return val.fromNow();
    }
    return undefined;
  }

  const columns: EditColunms[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      editType: 'Input',
      required: true,
      validator: { max: 5 }
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      editType: 'Select',
      required: true,
      dataSource: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 0,
        },
        {
          label: '其他',
          value: 2,
        },
      ],
      filters: [
        {
          text: '男',
          value: 1,
        },
        {
          text: '女',
          value: 0,
        },
        {
          text: '其他',
          value: 2,
        },
      ],
      filterSearch: true,
      onFilter: (value: string | number | boolean, record) => record.sex === value,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      editType: 'NumberPicker',
      required: true,
      componentProps: {
        max: 200
      },
      validator: { max: 200 },
      reactions: {
        dependencies: ['.birthday'],
        fulfill: {
          state: {
            value: `{{$deps[0] ? moment().diff($deps[0], 'year') : undefined}}`
          },
        },
      }
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      editType: 'DatePicker',
      required: true,
      componentProps: {
        disabledDate: (current: moment.Moment) => {
          // Can not select days before today and today
          return current && current > moment().endOf('day');
        }
      },
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      editType: 'Input.TextArea',
      componentProps: {
        rows: 1
      },
      validator: { max: 5 }
    },
  ]

  return (
    <div>
      <EditableForm 
        columns={columns}
        dataSource={[]}
      />
    </div>
  );
}

export default Index;