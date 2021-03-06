import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Row, Col, Input, Select, Cascader, Button, Modal } from 'antd';
import regexps from '@/utils/regexps';
import { imgHost } from '@/services/mock';
import FormItemHead from '@/components/FormItemHead';
import TableList from '@/components/TableList';
import ImageBox from '@/components/ImageBox';
import ImageUpload from '@/components/ImageUpload';
import HLModal from '@/components/Modal';
import PreviewImage from '@/components/PreviewImage';
import OilSelectForm from './OilSelectForm';
import BankSelectForm from './BankSelectForm';
import styles from './gasForm.less';
import _ from 'lodash';
import dict from '@/utils/dict';

const imgUrl = `${imgHost[ENV]}/action/hletong/file/gasDownload?file_id=`;
const FormItem = Form.Item;
const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};
const isMember = '0'; // 开通E商贸通
const FEATURESERVICEIDLISTLENMAX = 6; // 特色服务最多选6个

let previewImage = null;

function showWarning(content) {
  Modal.warning({
    title: `${content}`,
  });
}

function getIndex (arr,obj) {
  return arr.findIndex(item =>{
    return item.oilModelName===obj.oilModelName
  })
}


@Form.create()
@connect(({ gasForm, global }) => ({
  gasForm,
  global,
}))
class CustomizeComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch({ type: 'gasForm/getDict' });
    dispatch({ type: 'global/getDictData', payload: 'cert_type' });
    dispatch({ type: 'global/getDictData', payload: 'bank_type' });
  }

  render() {
    const {
      dispatch,
      onOk,
      data,
      hasData,
      loading,
      global: { dictMap },
      gasForm: {
        provinceList,
        oilModelInfoList,
        featureServiceInfoList,
        formData,
        visible,
        isEdit,
        bankFormData,
        bankVisible,
        isBankEdit,
        gasIndexOf,
      },
      form: {
        getFieldDecorator,
        resetFields,
        setFieldsValue,
        getFieldValue,
        getFieldsValue,
        validateFields,
      },
    } = this.props;
    console.log(oilModelInfoList);
    const fileList = getFieldValue('gas.fileList') || data.fileList;
    const gasOilModelList = getFieldValue('gas.gasOilModelList') || data.gasOilModelList;
    const areaList = getFieldValue('gas.areaList') || data.areaList;
    let bankDto = getFieldValue('gas.bankDto');
    bankDto = bankDto === undefined ? data.bankDto : getFieldValue('gas.bankDto'); // 第一次获取入参
    const { isMemberOnline, gsCode } = data;
    const gasListProps = {
      style: {
        marginTop: -24,
      },
      rowKey: 'id',
      columns: [
        {
          title: '序号',
          key: '#',
          align: 'center',
          width: 60,
          fixed: 'left',
          render: (text, record, index) => <Fragment>{index + 1}</Fragment>,
        },
        {
          title: '油气名称',
          key: 'oilModelName',
          render: (text, record) => {
            return <Fragment>{record.oilModelName}</Fragment>;
          },
        },
        {
          title: '调价方式',
          key: 'oilChangeType',
          render: (text, record) => {
            return <Fragment>{dict.adjustPriceType[record.oilChangeType]}</Fragment>;
          },
        },
        {
          title: '挂牌零售价',
          align: 'center',
          key: 'oilRetailPrice',
          render: (text, record) => <Fragment>{record.oilRetailPrice}元/{record.oilUnit}</Fragment>,
        },
        {
          title: '会员折扣(%)',
          align: 'center',
          key: 'oilMemberAgio',
          render: (text, record) => <Fragment>{ record.oilChangeType==="0" ? record.oilMemberAgio : "/"}</Fragment>,
        },
        {
          title: '会员优惠(元)',
          align: 'center',
          key: 'oilMemberAgio',
          render: (text, record) => <Fragment>{record.oilChangeType==="1" ? record.oilMemberAgio : "/"}</Fragment>,
        },
        {
          title: '会员价',
          align: 'center',
          key: 'oilMemberPrice',
          render: (text, record) => <Fragment>{record.oilMemberPrice}元/{record.oilUnit}</Fragment>,
        },
        {
          title: <div style={{ textAlign: 'center' }}>操作</div>,
          key: 'operating',
          width: 100,
          align: 'center',
          render: (text, record, index) => {
            return (
              <Fragment>
                <a
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    dispatch({
                      type: 'gasForm/overrideStateProps',
                      payload: {
                        isEdit: true,
                        visible: true,
                        gasIndexOf: index,
                        formData: {
                          ...record,
                        },
                      },
                    });
                  }}
                >
                  编辑
                </a>
                <a
                  onClick={() => {
                    gasOilModelList.splice(index, 1);
                    setFieldsValue({
                      'gas.gasOilModelList': gasOilModelList,
                    });
                  }}
                >
                  删除
                </a>
              </Fragment>
            );
          },
        },
      ],
      dataSource: gasOilModelList,
      pagination: false,
    };
    const bankListProps = {
      style: {
        marginTop: -24,
      },
      rowKey: 'bankCode', // 加油站id
      columns: [
        {
          title: '开户银行',
          key: 'bankType',
          width: 100,
          align: 'center',
          render: record => {
            return (
              <Fragment>
                {dictMap.bank_type && dictMap.bank_type.codeToName[record.bankType]}
              </Fragment>
            );
          },
        },
        {
          title: '开户支行/分理处',
          key: 'bankAddress',
          width: 100,
          align: 'center',
          render: record => <Fragment>{record.bankAddress}</Fragment>,
        },
        {
          title: '户名',
          key: 'name',
          width: 100,
          align: 'center',
          render: record => <Fragment>{record.name}</Fragment>,
        },
        {
          title: '银行卡号',
          key: 'bankCode',
          width: 100,
          align: 'center',
          render: record => <Fragment>{record.bankCode}</Fragment>,
        },
        {
          title: '证件类型',
          key: 'certType',
          width: 150,
          align: 'center',
          render: (text, record) => (
            <Fragment>
              {dictMap.cert_type && dictMap.cert_type.codeToName[record.certType]}
            </Fragment>
          ),
        },
        {
          title: '证件号码',
          key: 'certCode',
          width: 100,
          align: 'center',
          render: (text, record) => <Fragment>{record.certCode}</Fragment>,
        },
        {
          title: '签约席位号',
          key: 'assignCode',
          width: 100,
          align: 'center',
          render: (text, record) => <Fragment>{record.assignCode}</Fragment>,
        },
        {
          title: '银行账户图片',
          key: 'photo',
          align: 'center',
          width: 100,
          render: (text, record) =>
            record.bankFile && record.bankFile.length && record.bankFile[0].fileId ? (
              <a
                onClick={() => {
                  previewImage.open(`${imgUrl}${record.bankFile[0].fileId}`);
                }}
              >
                查看
              </a>
            ) : (
              <span>暂无</span>
            ),
        },
        {
          title: <div style={{ textAlign: 'center' }}>操作</div>,
          key: 'operating',
          width: 100,
          align: 'center',
          render: (text, record, index) => {
            return (
              <Fragment>
                <a
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    dispatch({
                      type: 'gasForm/overrideStateProps',
                      payload: {
                        isBankEdit: true,
                        bankVisible: true,
                        bankIndexOf: index,
                        bankFormData: {
                          ...record,
                        },
                      },
                    });
                  }}
                >
                  编辑
                </a>
                <a
                  onClick={() => {
                    setFieldsValue({
                      'gas.bankDto': null,
                    });
                  }}
                >
                  删除
                </a>
              </Fragment>
            );
          },
        },
      ],
      pagination: false,
      dataSource: bankDto ? [bankDto] : [],
    };

    const pics = fileList.map((file, index) => {
      return (
        <div key={file.fileId} className={styles.imgBox}>
          <ImageBox
            url={`${imgUrl}${file.fileId}`}
            onDelete={() => {
              fileList.splice(index, 1);
              setFieldsValue({
                'gas.fileList': fileList,
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
                {getFieldDecorator('gas.memberName', {
                  initialValue: data.memberName,
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
                })(
                  <Input
                    readOnly={data.gsCode !== undefined}
                    placeholder="请输入手机号"
                    autoComplete="off"
                  />
                )}
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="管理员姓名">
                {getFieldDecorator('gas.adminName', {
                  initialValue: data.adminName,
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
                {getFieldDecorator('gas.adminCard', {
                  initialValue: data.adminCard,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写管理员身份证号',
                    },
                    {
                      pattern: regexps.IdCard,
                      message: '请填写正确的身份证号',
                    },
                  ],
                })(<Input placeholder="请输入管理员身份证号" autoComplete="off" />)}
              </FormItem>
            </Col>
          </Row>
          <FormItemHead>加油站信息：</FormItemHead>
          <Row>
            {data.gsCode !== undefined && (
              <Fragment>
                <Col lg={24} md={24} sm={24}>
                  <FormItem label="加油站编号">
                    <div>{data.gsCode}</div>
                  </FormItem>
                </Col>
                <Col lg={8} md={24} sm={24}>
                  <FormItem label="二维码">
                    <ImageBox url={`${imgUrl}${data.gsQrCode}`} />
                  </FormItem>
                </Col>
              </Fragment>
            )}
            <Col lg={data.gsCode !== undefined ? 16 : 24} md={24} sm={24}>
              <FormItem label="加油站照片(门头)">
                {pics}
                {fileList.length < 3 && (
                  <div className={styles.imgBox}>
                    <ImageUpload
                      onSuccess={file => {
                        fileList.push(file);
                        setFieldsValue({
                          'gas.fileList': fileList,
                        });
                      }}
                    />
                  </div>
                )}
                {getFieldDecorator('gas.fileList', {
                  initialValue: data.fileList,
                  rules: [
                    {
                      required: true,
                      validator: (rule, value, callback) => {
                        if (value.length === 0) {
                          showWarning('请上传加油站照片!');
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
                {getFieldDecorator('gas.gsName', {
                  initialValue: data.gsName,
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
                {getFieldDecorator('gas.gsPhone', {
                  initialValue: data.gsPhone,
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
                {getFieldDecorator('gas.gsEmail', {
                  initialValue: data.gsEmail,
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
                {getFieldDecorator('gas.gsContact', {
                  initialValue: data.gsContact,
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
              <FormItem label="营业时间">
                {getFieldDecorator('gas.gsBusinessTime', {
                  initialValue: data.gsBusinessTime,
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
            <Col {...formItemWidth}>
              <FormItem label="所在地区">
                {getFieldDecorator('gas.areaList', {
                  initialValue: data.areaList,
                  rules: [
                    {
                      required: true,
                      message: '请选择所在地区',
                    },
                  ],
                })(<Input type="hidden" />)}
                <Cascader
                  placeholder="请选择所在地区"
                  allowClear={false}
                  title={areaList.map(item => item.name).join(' / ')}
                  value={areaList.map(item => item.id)}
                  fieldNames={{
                    label: 'name',
                    value: 'id',
                    children: 'children',
                  }}
                  options={provinceList}
                  autoComplete="off"
                  onChange={(value, selectedOptions) => {
                    setFieldsValue({
                      'gas.areaList': selectedOptions.map(item => {
                        return {
                          id: item.id,
                          name: item.name,
                        };
                      }),
                    });
                  }}
                />
              </FormItem>
            </Col>
            <Col {...formItemWidth}>
              <FormItem label="详细地址">
                {getFieldDecorator('gas.gsDetailAddress', {
                  initialValue: data.gsDetailAddress,
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
            <Col lg={8} md={24} sm={24}>
              <FormItem label="特色服务">
                {getFieldDecorator('gas.gasFeatureServiceIdList', {
                  initialValue: data.gasFeatureServiceIdList,
                })(
                  <Select
                    mode="multiple"
                    placeholder="请选择,最多可选择6个"
                    style={{ width: '100%' }}
                    onChange={value => {
                      setFieldsValue({
                        'gas.gasFeatureServiceIdList': value,
                      });
                    }}
                  >
                    {featureServiceInfoList.map(service => (
                      <Select.Option
                        key={service.id}
                        disabled={
                          getFieldValue('gas.gasFeatureServiceIdList').length >=
                            FEATURESERVICEIDLISTLENMAX &&
                          getFieldValue('gas.gasFeatureServiceIdList').indexOf(service.id) === -1
                        }
                      >
                        {service.fsName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItemHead>油气分类：</FormItemHead>
          <TableList {...gasListProps} />
          <FormItem>
            {getFieldDecorator('gas.gasOilModelList', {
              initialValue: data.gasOilModelList,
              rules: [
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    if (value.length === 0) {
                      showWarning('请选择油气分类！');
                      callback('请选择油气分类');
                    }
                    callback();
                  },
                },
              ],
            })(<input type="hidden" />)}
          </FormItem>
          {(gasOilModelList.length < oilModelInfoList.length || gasOilModelList.length === 0) && (
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
                  },
                });
              }}
            >
              新增油气信息
            </Button>
          )}
          {isMemberOnline === isMember && (
            <Fragment>
              <FormItemHead>银行卡信息：</FormItemHead>
              <TableList {...bankListProps} />
              <FormItem>
                {getFieldDecorator('gas.bankDto', {
                  initialValue: data.bankDto,
                  // rules: [
                  //   {
                  //     required: true,
                  //     validator: (rule, value, callback) => {
                  //       if (value.length === 0) {
                  //         callback('请添加银行卡');
                  //       }
                  //       callback();
                  //     },
                  //   },
                  // ],
                })(<Input type="hidden" />)}
                <PreviewImage
                  ref={ref => {
                    previewImage = ref;
                  }}
                />
              </FormItem>
              {bankDto === null && (
                <Button
                  block
                  icon="plus"
                  type="dashed"
                  style={{ marginBottom: 20 }}
                  onClick={() => {
                    dispatch({
                      type: 'gasForm/createBankForm',
                      payload: gsCode,
                    });
                  }}
                >
                  新增银行卡
                </Button>
              )}
            </Fragment>
          )}
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
            disabled={loading}
          >
            取消
          </Button>
          <Button
            loading={loading}
            onClick={() => {
              validateFields(errors => {
                if (errors) {
                  return;
                }
                if (hasData === true) {
                    let params = _.clone(getFieldsValue());
                    params.gas.gasOilModelList = params.gas.gasOilModelList.map(item =>{
                      return {
                        oilUnit: oilModelInfoList[getIndex(oilModelInfoList,item)].oilUnit,
                        ...item
                      }
                    })
                    console.log(params);
                  onOk(
                    {
                      ...params,
                    },
                    resetFields
                  );
                }
              });
            }}
            type="primary"
          >
            保存
          </Button>
        </div>
        <HLModal
          title={`${isEdit === false ? '新增' : '编辑'}油气信息`}
          visible={visible}
          onOk={fData => {
            let Index = oilModelInfoList.findIndex((item)=>{
              return item.oilModelName === fData.oilSelect.oilModelName
            })
            console.log(fData.oilSelect)
            fData.oilSelect.oilUnit = oilModelInfoList[Index].oilUnit;
            console.log(fData.oilSelect)
            fData.oilSelect = Object.assign({}, formData, fData.oilSelect);
            if (isEdit === false) {
              gasOilModelList.push(fData.oilSelect);
            } else {
              gasOilModelList[gasIndexOf] = fData.oilSelect;
            }
            setFieldsValue({
              'gas.gasOilModelList': gasOilModelList,
            });
            dispatch({
              type: 'gasForm/closeForm',
            });
          }}
          onClose={() => {
            dispatch({
              type: 'gasForm/closeForm',
            });
          }}
        >
          <OilSelectForm
            data={formData}
            dictList={oilModelInfoList.map(r => {
              return { itemCode: r.id, itemName: r.oilModelName };
            })}
            hasSelect={gasOilModelList.map(r => {
              return { itemCode: r.oilModelId, itemName: r.oilModelName };
            })}
          />
        </HLModal>
        <HLModal
          width={1100}
          title={`${isBankEdit === false ? '新增' : '编辑'}银行卡信息`}
          visible={bankVisible}
          destroyOnClose
          onOk={fData => {
            setFieldsValue({
              'gas.bankDto': fData,
            });
            dispatch({
              type: 'gasForm/closeBankForm',
            });
          }}
          onClose={() => {
            dispatch({
              type: 'gasForm/closeBankForm',
            });
          }}
        >
          <BankSelectForm data={bankFormData} />
        </HLModal>
      </Fragment>
    );
  }
}
export default CustomizeComponent;
