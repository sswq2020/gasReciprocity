import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { Form, InputNumber } from 'antd';
import _ from 'lodash';
import Select from '@/components/Select';
import dict from '@/utils/dict';
import {DictToSelect} from '@/utils/utils';
// import regexps from '@/utils/regexps';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 18 },
  },
};
const adjustPriceTypeData = DictToSelect(dict.adjustPriceType);

@connect(({ gasForm }) => ({
  gasForm,
}))
class CustomizeComponent extends PureComponent {
  render() {
    const {
      data,
      hasSelect,
      dictList,
      form: { getFieldDecorator, setFieldsValue, getFieldValue },
    } = this.props;

    getFieldDecorator('oilSelect.oilModelName', {
      initialValue: data.oilModelName,
    });

    getFieldDecorator('oilSelect.oilChangeType', {
      initialValue: data.oilChangeType,
    });

    const setMemberPrice = (price, agio, ISDiscount= true) => {
      let mP = 0;
      // console.log(price, agio);
      // console.log(Number(price), Number(agio));
      const nP = Number(price);
      const nA = Number(agio);
      if (ISDiscount) {
        if (!!nP && !!nA) {
          mP = nP && nA ? ((nP * 100 * nA) / 10000).toFixed(2) : 0;
        }
      } else {
        if (!!nP && !!nA && nP > nA) {
          mP = nP - nA
        }
      }
      setFieldsValue({
        'oilSelect.oilMemberPrice': mP,
      });
    };

    const selectData = _.differenceBy(
      dictList,
      hasSelect.filter(item => item.itemCode !== data.oilModelId),
      'itemCode'
    );

    data.oilChangeType = data.oilChangeType || "0";
    const oilChangeType = getFieldValue('oilSelect.oilChangeType') || data.oilChangeType;

    if(oilChangeType === "0") {
      return (
        <Form style={{ marginBottom: -24 }}>
          <FormItem {...formItemLayout} label="油气名称">
            {getFieldDecorator('oilSelect.oilModelId', {
              initialValue: data.oilModelId,
              getValueFromEvent: value => {
                setFieldsValue({
                  'oilSelect.oilModelName': dictList.filter(r => r.itemCode === value)[0].itemName,
                });
                return value;
              },
              rules: [
                {
                  required: true,
                  message: '请选择油气名称',
                },
              ],
            })(<Select placeholder="请选择油气名称" autoComplete="off" data={selectData} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="调价方式">
            {getFieldDecorator('oilSelect.oilChangeType', {
              initialValue: data.oilChangeType,
              getValueFromEvent: value => {
                setFieldsValue({
                  'oilSelect.oilMemberAgio': 0,
                  'oilSelect.oilMemberPrice': getFieldValue('oilSelect.oilRetailPrice')
                });
                return value;
              },
              rules: [
                {
                  required: true,
                  message: '请选择调价方式',
                },
              ],
            })(<Select placeholder="请选择调价方式" autoComplete="off" data={adjustPriceTypeData} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="挂牌零售价">
            {getFieldDecorator('oilSelect.oilRetailPrice', {
              initialValue: data.oilRetailPrice,
              getValueFromEvent: value => {
                setMemberPrice(value, getFieldValue('oilSelect.oilMemberAgio'));
                return value;
              },
              rules: [
                {
                  required: true,
                  message: '请填写挂牌零售价',
                },
              ],
            })(
              <InputNumber
                placeholder="请填写挂牌零售价"
                autoComplete="off"
                min={0}
                step={1}
                precision={2}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          {/* <FormItem {...formItemLayout} label="挂牌零售价浮动预警">
            {getFieldDecorator('oilSelect.oilRetailWarn', {
              initialValue: data.oilRetailWarn,
              rules: [
                {
                  required: true,
                  message: '请填写挂牌零售价浮动预警',
                },
              ],
            })(
              <InputNumber
                placeholder="请填写挂牌零售价浮动预警"
                autoComplete="off"
                min={0}
                max={100}
                step={1}
                precision={2}
                style={{ width: 'calc(100% - 20px)' }}
              />
            )}{' '}
            %
          </FormItem> */}
          <FormItem {...formItemLayout} label="会员折扣">
            {getFieldDecorator('oilSelect.oilMemberAgio', {
              initialValue: data.oilMemberAgio,
              getValueFromEvent: value => {
                setMemberPrice(getFieldValue('oilSelect.oilRetailPrice'), value);
                return value;
              },
              rules: [
                {
                  required: true,
                  message: '请填写会员折扣',
                },
              ],
            })(
              <InputNumber
                placeholder="请填写会员折扣"
                autoComplete="off"
                min={0}
                max={100}
                step={1}
                precision={2}
                style={{ width: 'calc(100% - 20px)' }}
              />
            )}{' '}
            %
          </FormItem>
          <FormItem {...formItemLayout} label="会员价">
            {getFieldDecorator('oilSelect.oilMemberPrice', {
              initialValue: data.oilMemberPrice,
            })(
              <InputNumber
                style={{ width: '100%' }}
                readOnly
                placeholder="请填写会员折扣"
                autoComplete="off"
              />
            )}
          </FormItem>
        </Form>
      );
    } else {
      return (
        <Form style={{ marginBottom: -24 }}>
          <FormItem {...formItemLayout} label="油气名称">
            {getFieldDecorator('oilSelect.oilModelId', {
              initialValue: data.oilModelId,
              getValueFromEvent: value => {
                setFieldsValue({
                  'oilSelect.oilModelName': dictList.filter(r => r.itemCode === value)[0].itemName,
                });
                return value;
              },
              rules: [
                {
                  required: true,
                  message: '请选择油气名称',
                },
              ],
            })(<Select placeholder="请选择油气名称" autoComplete="off" data={selectData} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="调价方式">
            {getFieldDecorator('oilSelect.oilChangeType', {
              initialValue: data.oilChangeType,
              getValueFromEvent: value => {
                setFieldsValue({
                  'oilSelect.oilMemberAgio': 0,
                  'oilSelect.oilMemberPrice': getFieldValue('oilSelect.oilRetailPrice')
                });
                return value;
              },
              rules: [
                {
                  required: true,
                  message: '请选择调价方式',
                },
              ],
            })(<Select placeholder="请选择调价方式" autoComplete="off" data={adjustPriceTypeData} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="挂牌零售价">
            {getFieldDecorator('oilSelect.oilRetailPrice', {
              initialValue: data.oilRetailPrice,
              getValueFromEvent: value => {
                setMemberPrice(value, getFieldValue('oilSelect.oilMemberAgio'),false);
                return value;
              },
              rules: [
                {
                  required: true,
                  message: '请填写挂牌零售价',
                },
              ],
            })(
              <InputNumber
                placeholder="请填写挂牌零售价"
                autoComplete="off"
                min={0}
                max={getFieldDecorator('oilSelect.oilRetailPrice')}
                precision={2}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="会员优惠(元)">
            {getFieldDecorator('oilSelect.oilMemberAgio', {
              initialValue: data.oilMemberAgio,
              getValueFromEvent: value => {
                setMemberPrice(getFieldValue('oilSelect.oilRetailPrice'), value, false);
                return value;
              },
              rules: [
                {
                  required: true,
                  message: '请填写会员优惠',
                },
              ],
            })(
              <InputNumber
                placeholder="请填写会员优惠"
                autoComplete="off"
                min={0}
                max={getFieldDecorator('oilSelect.oilRetailPrice')}
                precision={2}
                style={{ width: 'calc(100% - 20px)' }}
              />
            )}{' '}
          </FormItem>
          <FormItem {...formItemLayout} label="会员价">
            {getFieldDecorator('oilSelect.oilMemberPrice', {
              initialValue: data.oilMemberPrice,
            })(
              <InputNumber
                style={{ width: '100%' }}
                readOnly
                placeholder="请填写会员折扣"
                autoComplete="off"
              />
            )}
          </FormItem>
        </Form>
      );
    }



  }
}

export default CustomizeComponent;
