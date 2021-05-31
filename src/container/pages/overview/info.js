import React, { useState } from 'react';
import { Row, Col, Form, Input, Upload, Select, Progress, Tag } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import { ShowResponse, TestimonialStyleWrapper } from '../style';
import { Modal } from '../../../components/modals/antd-modals';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import Swiper from 'react-id-swiper';

import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss';


SwiperCore.use([Navigation, Pagination]);
const paramsThree = {
  slidesPerView: 1,
  loop: true,
  navigation: {

  },
};

const { Option } = Select;
const Info = () => {
  const [state, setState] = useState({
    values: '',
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    url: null,
    update: {},
  });

  const { update } = state;
  const [form] = Form.useForm();

  const handleSubmit = values => {
    setState({ ...state, values });
  };

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });

  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      editVisible: false,
      update: {},
    });
  };

  const handleOk = values => {
    onCancel();
    form.resetFields();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Row justify="center">
      <Col xl={10} md={16} xs={24}>
        <div className="user-info-form">
          <BasicFormWrapper>
            <Form style={{ width: '100%', position: "inherit", }} form={form} name="info" onFinish={handleSubmit}>
              <Heading className="form-title" as="h4">
                Personal Information
              </Heading>
              <Form.Item name="image" label="Upload Document Image">
                <figure className="photo-upload align-center-v"
                  style={{
                    position: "inherit",
                  }}>
                  <figcaption>
                    <Upload>
                      <Link className="btn-upload" to="#">
                        <FeatherIcon icon="camera" size={16} />
                      </Link>
                    </Upload>

                  </figcaption>
                </figure>
              </Form.Item>

              <Form.Item name="image" label="Upload Document Image Back">
                <figure className="photo-upload align-center-v"
                  style={{
                    position: "inherit",
                  }}>
                  <figcaption>
                    <Upload>
                      <Link className="btn-upload" to="#">
                        <FeatherIcon icon="camera" size={16} />
                      </Link>
                    </Upload>
                  </figcaption>
                </figure>
              </Form.Item>
              <Form.Item name="image" label="Upload Document Image Back">
                <figure className="photo-upload align-center-v"
                  style={{
                    position: "inherit",
                  }}>
                  <figcaption>
                    <Upload>
                      <Link className="btn-upload" to="#">
                        <FeatherIcon icon="camera" size={16} />
                      </Link>
                    </Upload>
                  </figcaption>
                </figure>
              </Form.Item>
              <Form.Item name="image" label="Upload Document Image Back">
                <figure className="photo-upload align-center-v"
                  style={{
                    position: "inherit",
                  }}>
                  <figcaption>
                    <Upload>
                      <Link className="btn-upload" to="#">
                        <FeatherIcon icon="camera" size={16} />
                      </Link>
                    </Upload>
                  </figcaption>
                </figure>
              </Form.Item>





              <Form.Item name="country" initialValue="" label="Country">
                <Select style={{ width: '100%' }}>
                  <Option value="">Please Select</Option>
                  <Option value="bangladesh">Bangladesh</Option>
                  <Option value="india">India</Option>
                  <Option value="pakistan">Pakistan</Option>
                </Select>
              </Form.Item>


              <Form.Item>
                <div className="add-user-bottom text-right">
                  <Button
                    className="ant-btn ant-btn-light"
                    onClick={() => {
                      return form.resetFields();
                    }}
                  >
                    Reset
                  </Button>
                  <Button onClick={showModal} htmlType="submit" type="primary">
                    <Link to="#">Scne & Result</Link>
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </div>
      </Col>
      <Modal
        type={state.modalType}
        title="Response"
        visible={state.visible}
        footer={null}
        onCancel={handleCancel}
      >

        <div className="project-modal">
          <ShowResponse>
            <BasicFormWrapper>
              <Form form={form} name="contact" onFinish={handleOk}>

                <Form.Item name="Status" label="Status">

                  <Progress percent={"95"} strokeWidth={5} className="progress-primary" />

                </Form.Item>

                <Form.Item label="Document Image" name="name" st>
                  <TestimonialStyleWrapper>
                    <div
                      className="testimonial-block theme-4"
                      style={{
                        "background-color": "#fff"
                      }}>
                      <Swiper {...paramsThree}>
                        <img style={{ width: '100%' }} src={require(`../../../static/img/users/card/1.png`)} alt="" />
                        <img style={{ width: '100%' }} src={require(`../../../static/img/users/card/2.png`)} alt="" />
                      </Swiper>
                    </div>

                  </TestimonialStyleWrapper>

                </Form.Item>

                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[{ message: 'Please input your email!', type: 'email' }]}
                >
                  <Input placeholder="name@example.com" />
                </Form.Item>

                <Form.Item name="phone" label="Phone Number">
                  <Input placeholder="+440 2546 5236" />
                </Form.Item>

                <Form.Item name="designation" label="Position">
                  <Input placeholder="Input Position" />
                </Form.Item>

                <Form.Item name="company" label="Company Name">
                  <Input placeholder="Company Name" />
                </Form.Item>


              </Form>
            </BasicFormWrapper>
          </ShowResponse>
        </div>
      </Modal >

    </Row >
  );
};

export default Info;
