import React, { PureComponent, Fragment } from 'react';
import { Form, Row, Col, Input, Upload, Icon, Select, Cascader, Button, Modal } from 'antd';
import router from 'umi/router';
import FormItemHead from '@/components/FormItemHead';
import ListHeaderForm from '@/components/ListHeaderForm';
import TableList from '@/components/TableList';
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

const gasListProps = {
  // style: {
  //   marginTop: -24,
  // },
  columns: [
    {
      title: '序号',
      key: '#',
      width: 60,
      render: (text, record, index) => <Fragment>{(page - 1) * 10 + index + 1}</Fragment>,
    },
    {
      title: '分类名称',
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
      title: <div style={{ textAlign: 'center' }}>操作</div>,
      key: 'operating',
      width: 200,
      render: () => <div style={{ textAlign: 'center' }}>oo</div>,
    },
  ],
  dataSource: [],
};

const bankListProps = {
  columns: [
    {
      title: '序号',
      key: '#',
      width: 60,
      fixed: 'left',
      render: (text, record, index) => <Fragment>{(page - 1) * 10 + index + 1}</Fragment>,
    },
    {
      title: '开户银行',
      key: 'b',
      width: 100,
      fixed: 'left',
      render: (text, record) => {
        return <Fragment>{record.b}</Fragment>;
      },
    },
    {
      title: '开户支行/分理处',
      key: 'no',
      render: (text, record) => <Fragment>{record.c}</Fragment>,
    },
    {
      title: '户名',
      key: 'name',
      render: (text, record) => <Fragment>{record.d}</Fragment>,
    },
    {
      title: '银行卡号',
      key: 'tel',
      width: 100,
      render: (text, record) => <Fragment>{record.e}</Fragment>,
    },
    {
      title: '证件类型',
      key: 'contact',
      width: 120,
      render: (text, record) => <Fragment>{record.f}</Fragment>,
    },
    {
      title: '证件号码',
      key: 'contactPhone',
      render: (text, record) => <Fragment>{record.g}</Fragment>,
    },
    {
      title: '是否默认',
      key: 'contactEmail',
      width: 100,
      render: (text, record) => <Fragment>{record.h}</Fragment>,
    },
    {
      title: '指定签约席位号',
      key: 'add',
      render: (text, record) => <Fragment>{record.i}</Fragment>,
    },
    {
      title: '银行账户图片',
      key: 'qCode',
      width: 150,
      render: () => <a>点击查看</a>,
    },
    {
      title: <div style={{ textAlign: 'center' }}>操作</div>,
      key: 'operating',
      width: 200,
      fixed: 'right',
      render: () => <div style={{ textAlign: 'center' }}>000</div>,
    },
  ],
  rowKey: 'a',
  scroll: { x: 'max-content' },
  dataSource: [],
};

@Form.create()
class CustomizeComponent extends PureComponent {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传照片</div>
      </div>
    );

    return (
      <ListHeaderForm>
        <Form className={styles.gasForm} layout="inline">
          <FormItemHead>账号管理员信息：</FormItemHead>
          <Row>
            <Col {...formItemWidth}>
              <FormItem label="会员名">
                {getFieldDecorator('text')(<Input placeholder="请输入手机号" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="管理员姓名">
                {getFieldDecorator('appId')(
                  <Input placeholder="请输入管理员姓名" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="管理员身份证号">
                {getFieldDecorator('appId')(
                  <Input placeholder="请输入管理员身份证号" autoComplete="off" />
                )}
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
                <Upload action="//jsonplaceholder.typicode.com/posts/" listType="picture-card">
                  {uploadButton}
                </Upload>
              </FormItem>
            </Col>
            <Col lg={16} md={24} sm={24}>
              <FormItem label="加油站照片(门头)">
                <Upload action="//jsonplaceholder.typicode.com/posts/" listType="picture-card">
                  {uploadButton}
                </Upload>
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="油站联系人">
                {getFieldDecorator('text')(<Input placeholder="请输入" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="联系电话">
                {getFieldDecorator('appId')(<Input placeholder="请输入" autoComplete="off" />)}
              </FormItem>
            </Col>
            {/* <Col {...formItemWidth}>
              <FormItem>
                <Checkbox style={{ marginLeft: 20 }}>同管理员</Checkbox>
              </FormItem>
            </Col> */}
            <Col {...formItemWidth}>
              <FormItem label="加油站名称">
                {getFieldDecorator('text')(<Input placeholder="请输入" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="加油站电话">
                {getFieldDecorator('appId')(<Input placeholder="请输入" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="联系邮箱">
                {getFieldDecorator('appId')(<Input placeholder="请输入" autoComplete="off" />)}
              </FormItem>
            </Col>

            <Col {...formItemWidth}>
              <FormItem label="所在地区">
                {getFieldDecorator('area')(
                  <Cascader placeholder="请输入" options={options} autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="详细地址">
                {getFieldDecorator('text')(<Input placeholder="请输入" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="营业时间">
                {getFieldDecorator('text')(<Input placeholder="请输入" autoComplete="off" />)}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="特色服务">
                {getFieldDecorator('test')(
                  <Select
                    mode="multiple"
                    placeholder="请选择"
                    onChange={() => {}}
                    style={{ width: '100%' }}
                  >
                    {children}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItemHead>油品分类：</FormItemHead>
          <TableList {...gasListProps} />
          <FormItemHead>银行卡信息：</FormItemHead>
          <TableList {...bankListProps} />
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
          <Button onClick={() => {}} type="primary">
            保存
          </Button>
        </div>
      </ListHeaderForm>
    );
  }
}

export default CustomizeComponent;
