import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Row, Col, Input, Select, Cascader, Button, Modal } from 'antd';
import regexps from '@/utils/regexps';
import FormItemHead from '@/components/FormItemHead';
import TableList from '@/components/TableList';
import ImageBox from '@/components/ImageBox';
import ImageUpload from '@/components/ImageUpload';
import HLModal from '@/components/Modal';
import OilSelectForm from './OilSelectForm';
import styles from './gasForm.less';

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
}
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const FormItem = Form.Item;
const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};

// const bankListProps = {
//   columns: [
//     {
//       title: '序号',
//       key: '#',
//       width: 60,
//       fixed: 'left',
//       render: (text, record, index) => <Fragment>{(page - 1) * 10 + index + 1}</Fragment>,
//     },
//     {
//       title: '开户银行',
//       key: 'b',
//       width: 100,
//       fixed: 'left',
//       render: (text, record) => {
//         return <Fragment>{record.b}</Fragment>;
//       },
//     },
//     {
//       title: '开户支行/分理处',
//       key: 'no',
//       render: (text, record) => <Fragment>{record.c}</Fragment>,
//     },
//     {
//       title: '户名',
//       key: 'name',
//       render: (text, record) => <Fragment>{record.d}</Fragment>,
//     },
//     {
//       title: '银行卡号',
//       key: 'tel',
//       width: 100,
//       render: (text, record) => <Fragment>{record.e}</Fragment>,
//     },
//     {
//       title: '证件类型',
//       key: 'contact',
//       width: 120,
//       render: (text, record) => <Fragment>{record.f}</Fragment>,
//     },
//     {
//       title: '证件号码',
//       key: 'contactPhone',
//       render: (text, record) => <Fragment>{record.g}</Fragment>,
//     },
//     {
//       title: '是否默认',
//       key: 'contactEmail',
//       width: 100,
//       render: (text, record) => <Fragment>{record.h}</Fragment>,
//     },
//     {
//       title: '指定签约席位号',
//       key: 'add',
//       render: (text, record) => <Fragment>{record.i}</Fragment>,
//     },
//     {
//       title: '银行账户图片',
//       key: 'qCode',
//       width: 150,
//       render: () => <a>点击查看</a>,
//     },
//     {
//       title: <div style={{ textAlign: 'center' }}>操作</div>,
//       key: 'operating',
//       width: 200,
//       fixed: 'right',
//       render: () => <div style={{ textAlign: 'center' }}>000</div>,
//     },
//   ],
//   rowKey: 'a',
//   scroll: { x: 'max-content' },
//   dataSource: [],
// };

@Form.create()
@connect(({ gasForm }) => ({
  gasForm,
}))
class CustomizeComponent extends PureComponent {
  render() {
    const {
      dispatch,
      data = {},
      gasForm: { formData, imgList, oilList, oilSelectList, visible, isEdit },
      form: { getFieldDecorator, resetFields, getFieldsValue, validateFields },
    } = this.props;

    const gasListProps = {
      style: {
        marginTop: -24,
        paddingBottom: 20,
      },
      columns: [
        {
          title: '序号',
          key: '#',
          width: 60,
          render: (text, record, index) => <Fragment>{index + 1}</Fragment>,
        },
        {
          title: '油品名称',
          key: 'b',
          render: (text, record) => {
            return <Fragment>{record.b}</Fragment>;
          },
        },
        {
          title: '零售价',
          key: 'no',
          render: (text, record) => <Fragment>{record.c}</Fragment>,
        },
        {
          title: '会员折扣(%)',
          key: 'name',
          render: (text, record) => <Fragment>{record.d}</Fragment>,
        },
        {
          title: '会员价',
          key: 'tel',
          render: (text, record) => <Fragment>{record.e}</Fragment>,
        },
        {
          title: '零售价浮动预警',
          key: 'sf',
          render: (text, record) => <Fragment>{record.f}</Fragment>,
        },
        {
          title: <div style={{ textAlign: 'center' }}>操作</div>,
          key: 'operating',
          width: 100,
          render: (text, record, index) => {
            return (
              <div style={{ textAlign: 'center' }}>
                <a
                  onClick={() => {
                    dispatch({
                      type: 'gasForm/delete',
                      payload: index,
                    });
                  }}
                >
                  删除
                </a>
              </div>
            );
          },
        },
      ],
      dataSource: oilList,
      pagination: false,
    };

    const pics = imgList.map((r, i) => {
      return (
        <div key={r} className={styles.imgBox}>
          <ImageBox
            url="//lorempixel.com/450/200/"
            onDelete={() => {
              imgList.splice(i, 1);
              dispatch({
                type: 'gasForm/overrideStateProps',
                payload: {
                  imgList,
                },
              });
            }}
          />
        </div>
      );
    });

    return (
      <Fragment>
        <Form className={styles.gasForm}>
          <FormItemHead>账号管理员信息：</FormItemHead>
          <Row>
            <Col {...formItemWidth}>
              <FormItem label="会员名">
                {getFieldDecorator('gas.user', {
                  initialValue: data.user,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写会员名',
                    },
                    {
                      pattern: regexps.mobPhone,
                      message: '请填写正确的手机号',
                    },
                  ],
                })(<Input placeholder="请输入手机号" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="管理员姓名">
                {getFieldDecorator('gas.name', {
                  initialValue: data.name,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写管理员姓名',
                    },
                    {
                      whitespace: true,
                      max: 20,
                      message: '最多20个字符',
                    },
                  ],
                })(<Input placeholder="请输入管理员姓名" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="管理员身份证号">
                {getFieldDecorator('gas.pId', {
                  initialValue: data.pId,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写管理员身份证号',
                    },
                    {
                      whitespace: true,
                      message: '前填写正确的身份证号',
                    },
                  ],
                })(<Input placeholder="请输入管理员身份证号" autoComplete="off" />)}
              </FormItem>
            </Col>
          </Row>
          <FormItemHead>加油站信息：</FormItemHead>
          <Row>
            <Col lg={24} md={24} sm={24}>
              <FormItem label="加油站编号">
                <div>sfsfsf</div>
              </FormItem>
            </Col>
            <Col lg={8} md={24} sm={24}>
              <FormItem label="二维码">
                <ImageBox url="//lorempixel.com/450/200/" />
              </FormItem>
            </Col>
            <Col lg={16} md={24} sm={24}>
              <FormItem label="加油站照片(门头)">
                {pics}
                {imgList.length < 3 && (
                  <div className={styles.imgBox}>
                    <ImageUpload
                      onSuccess={response => {
                        console.log(response);
                        imgList.push(imgList.length);
                        dispatch({
                          type: 'gasForm/overrideStateProps',
                          payload: {
                            imgList,
                          },
                        });
                      }}
                    />
                  </div>
                )}
                {getFieldDecorator('gas.pic', {
                  initialValue: imgList,
                  rules: [
                    {
                      validator: (rule, value, callback) => {
                        console.log(value);
                        if (value.length === 0) {
                          callback('请上传加油站照片');
                        }
                        callback();
                      },
                    },
                  ],
                })(<input type="hidden" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="加油站名称">
                {getFieldDecorator('gas.gasName', {
                  initialValue: data.gasName,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写加油站名称',
                    },
                    {
                      whitespace: true,
                      max: 20,
                      message: '最多20个字符',
                    },
                  ],
                })(<Input placeholder="请输入加油站名称" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="加油站电话">
                {getFieldDecorator('gas.gasPhone', {
                  initialValue: data.gasPhone,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写加油站电话',
                    },
                    {
                      pattern: regexps.phone,
                      message: '请填写正确的电话号码',
                    },
                  ],
                })(<Input placeholder="请输入加油站电话" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="联系邮箱">
                {getFieldDecorator('gas.mail', {
                  initialValue: data.mail,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写联系邮箱',
                    },
                    {
                      pattern: regexps.email,
                      message: '请填写正确的邮箱地址',
                    },
                  ],
                })(<Input placeholder="请输入联系邮箱" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="油站联系人">
                {getFieldDecorator('gas.contact', {
                  initialValue: data.contact,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写油站联系人',
                    },
                    {
                      whitespace: true,
                      max: 10,
                      message: '最多10个字符',
                    },
                  ],
                })(<Input placeholder="请输入油站联系人" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="联系电话">
                {getFieldDecorator('gas.contactPhone', {
                  initialValue: data.contactPhone,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写联系电话',
                    },
                    {
                      pattern: regexps.mobPhone,
                      message: '请填写正确的电话号码',
                    },
                  ],
                })(<Input placeholder="请输入联系电话" autoComplete="off" />)}
              </FormItem>
            </Col>
            {/* <Col {...formItemWidth}>
              <FormItem>
                <Checkbox style={{ marginLeft: 20 }}>同管理员</Checkbox>
              </FormItem>
            </Col> */}

            <Col {...formItemWidth}>
              <FormItem label="所在地区">
                {getFieldDecorator('gas.area', {
                  initialValue: data.area,
                  rules: [
                    {
                      required: true,
                      message: '请选择所在地区',
                    },
                  ],
                })(
                  <Cascader
                    allowClear={false}
                    placeholder="请选择所在地区"
                    options={options}
                    autoComplete="off"
                  />
                )}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="详细地址">
                {getFieldDecorator('gas.address', {
                  initialValue: data.address,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写详细地址',
                    },
                    {
                      whitespace: true,
                      max: 40,
                      message: '最多40个字符',
                    },
                  ],
                })(<Input placeholder="请输入详细地址" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="营业时间">
                {getFieldDecorator('gas.workTime', {
                  initialValue: data.workTime,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写营业时间',
                    },
                    {
                      whitespace: true,
                      max: 40,
                      message: '最多40个字符',
                    },
                  ],
                })(<Input placeholder="请输入营业时间" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col lg={8} md={24} sm={24}>
              <FormItem label="特色服务">
                {getFieldDecorator('gas.service')(
                  <Select mode="multiple" placeholder="请选择" style={{ width: '100%' }}>
                    {children}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItemHead>油品分类：</FormItemHead>
          <TableList {...gasListProps} />
          {getFieldDecorator('gas.oilList', {})(<input type="hidden" />)}
          {oilList.length < oilSelectList.length && (
            <Button
              block
              icon="plus"
              type="dashed"
              style={{ marginBottom: 20 }}
              onClick={() => {
                dispatch({
                  type: 'gasForm/openForm',
                  payload: {
                    isEdit: false,
                    id: null,
                  },
                });
              }}
            >
              新增油品信息
            </Button>
          )}
          {/* <FormItemHead>银行卡信息：</FormItemHead>
          <TableList {...bankListProps} /> */}
        </Form>
        <div className={styles.footer}>
          <Button
            onClick={() => {
              Modal.confirm({
                autoFocusButton: null,
                title: '取消操作',
                content: '你确定保存前取消？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                  router.push('/gasSys/gas');
                },
              });
            }}
          >
            取消
          </Button>
          <Button
            onClick={() => {
              validateFields(errors => {
                if (errors) {
                  return;
                }
                onOk(
                  {
                    ...getFieldsValue(),
                  },
                  resetFields
                );
              });
            }}
            type="primary"
          >
            保存
          </Button>
        </div>
        <HLModal
          title={`${isEdit === false ? '新增' : '编辑'}油品信息`}
          visible={visible}
          onOk={(fData, fResetFields) => {
            dispatch({
              type: isEdit === false ? 'gasForm/add' : 'gasForm/edit',
              payload: {
                data: { ...fData.oilSelect },
                resetFields: fResetFields,
              },
            });
          }}
          onClose={() => {
            dispatch({
              type: 'gasForm/closeForm',
            });
          }}
        >
          <OilSelectForm data={formData} />
        </HLModal>
      </Fragment>
    );
  }
}

export default CustomizeComponent;
