import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Row, Col, Form, Input, Select, Switch, Radio, Upload, Table } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { FigureWizards, WizardWrapper, ProductTable, OrderSummary } from '../Style';
import { Steps } from '../../../../components/steps/steps';
import Heading from '../../../../components/heading/heading';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Slider } from '../../../../components/slider/slider';
import { Tag } from '../../../../components/tags/tags';
import { BasicFormWrapper, TagInput } from '../../../styled';
import { cartGetData, cartUpdateQuantity, cartDelete } from '../../../../redux/cart/actionCreator';

const { Dragger } = Upload;
const { Option } = Select;
const { TextArea } = Input;

const WizardsOne = () => {
  const dispatch = useDispatch();
  const { cartData, rtl } = useSelector(state => {
    return {
      cartData: state.cart.data,
      isLoading: state.cart.loading,
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });
  const [form] = Form.useForm();

  const [state, setState] = useState({
    status: 'process',
    isFinished: false,
    current: 1,
    tags: ['High Accuracy', 'Hong Kong'],
    values: null,
    file: null,
  });

  const { status, isFinished, current, tags, values } = state;

  useEffect(() => {
    if (cartGetData) {
      dispatch(cartGetData());
    }
  }, [dispatch]);

  useLayoutEffect(() => {
    const activeElement = document.querySelectorAll('.ant-steps-item-active');
    const successElement = document.querySelectorAll('.ant-steps-item-finish');

    activeElement.forEach(element => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        if (bgImage.classList.contains('success-step-item')) {
          bgImage.classList.remove('success-step-item');
        } else {
          bgImage.classList.remove('wizard-step-item');
        }
        bgImage.classList.add('wizard-steps-item-active');
      }
    });

    successElement.forEach(element => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        bgImage.classList.remove('wizard-steps-item-active');
        bgImage.classList.add('success-step-item');        
      }
    });
  });


  const onSliderChange = value => {
    setState({ ...state, onChangeValue: value });
  };


  const next = () => {
    setState({
      ...state,
      status: 'process',
      current: current + 1,
    });
  };

  const prev = () => {
    setState({
      ...state,
      status: 'process',
      current: current - 1,
    });
  };

  const done = () => {
    const confirm = window.confirm('Are sure to submit profile?');
    if (confirm) {
      setState({
        ...state,
        status: 'finish',
        isFinished: true,
        current: 0,
      });
    }
  };

  const handleSubmit = values => {
    setState({ ...state, values: { ...values, tags: state.tags } });
  };

  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };

  const checked = checke => {
    setState({ tags: checke });
  };

  const props = {
      name: 'file',
      multiple: false,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
 

  return (
    <WizardWrapper>
      <Steps
        isswitch
        current={0}
        status={status}
        steps={[
          {
            title: 'Create Profile',
            content: (
              <BasicFormWrapper className="basic-form-inner">
                <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="create-account-form">
                        <Heading as="h4">Basic Information</Heading>
                        <Form form={form} name="basic">
                          <Form.Item name="profilename" label="Profile name">
                            <Input placeholder="Profilename" />
                          </Form.Item>
                          <Form.Item name="basic-textarea" label="Description">
                            <TextArea />
                          </Form.Item>
                          <Form.Item name="profilecolor" label="Profile Color">
                            <div className="sDash_color-picker">
                              <Input type="color" value="#5F63F2" />
                            </div>
                          </Form.Item>
                          <Form.Item name="Tags" label="Tags">
                            <TagInput>
                              <Tag animate onChange={checked} data={state.tags} />
                            </TagInput>
                          </Form.Item>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </div>
              </BasicFormWrapper>
            ),
          },
          {
            title: 'Authenticate',
            content: (
              <BasicFormWrapper className="basic-form-inner">
                <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="shipping-form">
                        <Form form={form} name="authentication">
                          <Heading as="h4">Document Validation &amp; Authentication</Heading>
                          <Form.Item name="authenticate" initialValue="1" label="Authentication">
                            <Select style={{ width: '100%' }}>
                              <Option value="">Please Select</Option>
                              <Option value="1">Yes</Option>
                              <Option value="0">No</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item name="authenticate_module" initialValue="2" label="Authentication Module">
                            <Select style={{ width: '100%' }}>
                              <Option value="">Please Select</Option>
                              <Option value="2">V2</Option>
                              <Option value="1">V1</Option>
                            </Select>
                          </Form.Item>
                          <Heading as="h4">Vault Block List</Heading>
                          <Form.Item name="checkblocklist" initialValue="0" label="Check Vault Block List">
                            <Select style={{ width: '100%' }}>
                              <Option value="">Please Select</Option>
                              <Option value="1">Yes</Option>
                              <Option value="0">No</Option>
                            </Select>
                          </Form.Item>
                          <Heading as="h4">Expiry Check</Heading>
                          <Form.Item name="verify_expiry" initialValue="1" label="Check Document Expiry">
                            <Select style={{ width: '100%' }}>
                              <Option value="">Please Select</Option>
                              <Option value="1">Yes</Option>
                              <Option value="0">No</Option>
                            </Select>
                          </Form.Item>
                          <Heading as="h4">Dual-Side Information Check</Heading>
                          <Form.Item name="dualsidecheck" initialValue="0" label="Verify Dual-Side Information">
                            <Select style={{ width: '100%' }}>
                              <Option value="">Please Select</Option>
                              <Option value="1">Yes</Option>
                              <Option value="0">No</Option>
                            </Select>
                          </Form.Item>
                          <Heading as="h4">Information Check</Heading>
                          <Form.Item name="verify_documentno" label="Document Number Check">
                            <Input placeholder="123456789" />
                          </Form.Item>
                          <Form.Item name="verify_name" label="Name Check">
                            <Input placeholder="Enter Name" />
                          </Form.Item>
                          <Form.Item name="verify_dob" label="Birthday Check">
                            <Input placeholder="YYYY/MM/DD" />
                          </Form.Item>
                          <Form.Item name="verify_age" label="Age Check">
                            <Input placeholder="18-40" />
                          </Form.Item>
                          <Form.Item name="verify_address" label="Address Check">
                            <Input placeholder="House Number and Street Name, Apartment, Suite, Unit etc." />
                          </Form.Item>
                          <Form.Item name="verify_postcode" label="Postcode Check">
                            <Input placeholder="Enter Postal Code" />
                          </Form.Item>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </div>
              </BasicFormWrapper>
            ),
          },
          {
            title: 'Misc',
            content: (
              <BasicFormWrapper className="basic-form-inner">
                <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="shipping-form">
                        <Form form={form} name="authentication">
                          <Heading as="h4">Auto Crop</Heading>
                          <Form.Item name="outputimage" initialValue="0" label="Output Cropped Document">
                            <Select style={{ width: '100%' }}>
                              <Option value="">Please Select</Option>
                              <Option value="1">Yes</Option>
                              <Option value="0">No</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item name="outputface" initialValue="0" label="Output Cropped Face">
                            <Select style={{ width: '100%' }}>
                              <Option value="">Please Select</Option>
                              <Option value="1">Yes</Option>
                              <Option value="0">No</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item name="outputmode" initialValue="URL" label="Output Mode">
                            <Select style={{ width: '100%' }}>
                              <Option value="">Please Select</Option>
                              <Option value="URL">URL</Option>
                              <Option value="Base64">Base64</Option>
                            </Select>
                          </Form.Item>
                          <Heading as="h4">Document Type &amp; Region Restriction</Heading>
                          <Form.Item name="country" label="Issuing Country">
                            <Input placeholder="ISO2 country code(s)" />
                          </Form.Item>
                          <Form.Item name="region" label="Issuing Region">
                            <Input placeholder="State/Region name(s)" />
                          </Form.Item>
                          <Form.Item name="type" label="Document Type">
                            <Input placeholder="P: Passport, D: Driver's License, I: Identity Card" />
                          </Form.Item>
                          <Heading as="h4">Data Extraction Settings</Heading>
                          <Form.Item name="accuracy" initialValue="2" label="Accuracy">
                            <Select style={{ width: '100%' }}>
                              <Option value="">Please Select</Option>
                              <Option value="2">High</Option>
                              <Option value="1">Medium</Option>
                              <Option value="0">Low</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item name="return_confidence" initialValue="1" label="Show Confidence Score">
                            <Select style={{ width: '100%' }}>
                              <Option value="">Please Select</Option>
                              <Option value="1">Yes</Option>
                              <Option value="0">No</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item name="ocr_scaledown" label="Scale Down Image">
                            <Input placeholder="1500" />
                          </Form.Item>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </div>
              </BasicFormWrapper>
            ),
          },
          {
            title: 'Custom',
            content: (
              <BasicFormWrapper className="basic-form-inner">
                <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="payment-method-form">
                        <Heading as="h4">Custom Setting</Heading>
                        <div className="shipping-selection">
                          <Cards title="Passed" className="mb-25">
                            <div className="sDash_slider-list">
                              <Slider onChange={onSliderChange} range defaultValues={[85, 100]} />
                            </div>
                          </Cards>
                          <Cards title="Reviewed" className="mb-25">
                            <div className="sDash_slider-list">
                              <Slider onChange={onSliderChange} range defaultValues={[60, 85]} />
                            </div>
                          </Cards>
                          <Cards title="Failed" className="mb-25">
                            <div className="sDash_slider-list">
                              <Slider onChange={onSliderChange} defaultValue={60} />
                            </div>
                          </Cards>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </BasicFormWrapper>
            ),
          },
          {
            title: 'Review & Test',
            content:
              status !== 'finish' ? (
                <BasicFormWrapper className="basic-form-inner">
                <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="payment-method-form">
                        <Heading as="h4">Document Testing</Heading>
                        <div className="shipping-selection">
                          <Cards title="Upload Image" className="mb-25">
                            <div className="sDash_uploader-list">
                              <Dragger /*{...props}*/ className="sDash-uploader-large">
                                <p className="ant-upload-text">Drop document here to upload</p>
                              </Dragger>
                            </div>
                          </Cards>
                          <p>Set as default</p>
                          <Switch defaultChecked size="large" />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </BasicFormWrapper>
              ) : (
                <Row justify="center" style={{ width: '100%' }}>
                  <Col xl={22} xs={24}>
                    <div className="checkout-successful">
                      <Cards
                        headless
                        bodyStyle={{
                          backgroundColor: '#F8F9FB',
                          borderRadius: '20px',
                        }}
                      >
                        <Cards headless>
                          <span className="icon-success">
                            <FeatherIcon icon="check" />
                          </span>
                          <Heading as="h3">Successful</Heading>
                          <p>Thank you! You can use this profile while scanning document.</p>
                        </Cards>
                      </Cards>
                    </div>
                  </Col>
                </Row>
              ),
          },
        ]}
        onNext={next}
        onPrev={prev}
        onDone={done}
        isfinished={isFinished}
      />
    </WizardWrapper>
  );
};

export default WizardsOne;
