import React, { PureComponent } from 'react';
import { Form, Input, Radio } from 'antd';
import dict from '@/utils/dict';
import MySelect from '@/components/Select';

const oilUnitList = Object.keys(dict.oilModelUnit).map(item => {
  return { itemCode: item, itemName: item };
});

const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
    md: { span: 17 },
  },
};

export default class CustomizeComponent extends PureComponent {
  render() {
    const {
      data,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form style={{ marginBottom: -24 }}>
        <FormItem {...formItemLayout} label="油气分类名称">
          {getFieldDecorator('oil.oilModelName', {
            initialValue: data.oilModelName,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请填写油气分类名称',
              },
              {
                whitespace: true,
                max: 10,
                message: '最多10个字符',
              },
            ],
          })(
            <Input
              readOnly={!!data.oilModelName}
              placeholder="请填写油气分类名称"
              autoComplete="off"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="油气单位">
          {getFieldDecorator('oil.oilUnit', {
            initialValue: data.oilUnit,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请填写油气单位',
              },
            ],
          })(
            <MySelect
            placeholder="请选择"
            style={{ width: '100%' }}
            data={oilUnitList}
          />
          )}
        </FormItem>        
        <FormItem {...formItemLayout} label="油气分类描述">
          {getFieldDecorator('oil.oilModelDesc', {
            initialValue: data.oilModelDesc,
            rules: [
              {
                max: 50,
                message: '最多50个字符',
              },
            ],
          })(
            <TextArea
              autosize={{ minRows: 3, maxRows: 3 }}
              placeholder="请填写油气分类描述"
              autoComplete="off"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="是否展示默认">
          {getFieldDecorator('oil.isDefault', {
            initialValue: data.isDefault,
          })(
            <RadioGroup>
              <Radio value={dict.oilModelIsDefault}>是</Radio>
              <Radio value={dict.oilModelIsNotDefault}>否</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    );
  }
}
