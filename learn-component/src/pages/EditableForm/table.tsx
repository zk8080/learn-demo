import React from 'react'
import {
  FormItem,
  Input,
  ArrayTable,
  Editable,
  FormButtonGroup,
  Submit,
  DatePicker,
  Select,
  NumberPicker,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { ConfigProvider } from 'antd'
import { EditColunms } from './index.d';
import 'antd/node_modules/moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import moment from 'antd/node_modules/moment'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    Input,
    ArrayTable,
    DatePicker,
    Select,
    NumberPicker,
  },
  scope: {
    moment
  }
})

const form = createForm()

interface IProps {
  columns: EditColunms[],
  dataSource: any[]
}

export default (props: IProps) => {
  const { columns, dataSource } = props;
  console.log(columns, '--columns--');
  console.log(form, '--form--');
  return (
    <ConfigProvider
      locale={locale}
    >
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Array
            name="dataSource"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{
              pagination: { pageSize: 10 },
              scroll: { x: '100%' },
              onChange: (pag, filter) => {
                console.log(pag, '---pag--');
                console.log(filter, '--filter--');
              }
            }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ width: 50, title: 'Sort', align: 'center' }}
              >
                <SchemaField.Void
                  x-decorator="FormItem"
                  required
                  x-component="ArrayTable.SortHandle"
                />
              </SchemaField.Void>
              {
                columns.map(item => {
                  const { editType, componentProps, required, validator, dataSource, reactions, ...rest } = item;
                  console.log(validator, '--validator--');
                  return (
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={rest}
                      key={item.key}
                    >
                      <SchemaField.String
                        x-decorator="FormItem"
                        name={item.dataIndex as string}
                        required
                        x-component={editType}
                        x-component-props={componentProps}
                        x-validator={validator}
                        enum={dataSource}
                        x-reactions={reactions}
                      />
                    </SchemaField.Void>
                  )
                })
              }
            </SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Addition"
              title="添加条目"
            />
          </SchemaField.Array>
        </SchemaField>
        <FormButtonGroup>
          <Submit onSubmit={console.log}>提交</Submit>
        </FormButtonGroup>
      </FormProvider>
    </ConfigProvider>

  )
}