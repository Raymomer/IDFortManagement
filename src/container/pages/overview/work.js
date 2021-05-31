import React, { useState } from 'react';
import { Row, Col, Form, Upload,Select } from 'antd';
import { Link } from 'react-router-dom';
import { BasicFormWrapper } from '../../styled';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';

const dateFormat = 'MM/DD/YYYY';

const Work = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    values: '',
  });
  const handleSubmit = values => {
    setState({ ...state, values });
  };

  return (
    <Row justify="center">
      <Col xl={10} md={16} xs={24}>
        <div className="user-work-form">
          <BasicFormWrapper>
            <Form style={{ width: '100%' }} form={form} name="info" onFinish={handleSubmit}>
              <Heading className="form-title" as="h4">
                Work Information
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
                  <Button htmlType="submit" type="primary">
                    <Link to="work">Scne & Result</Link>
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </div>
      </Col>
    </Row>
  );
};

export default Work;
