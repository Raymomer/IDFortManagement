import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { HorizontalForm } from '../forms/overview/HorizontalForm';
import { HorizontalFormStyleWrap } from '../forms/overview/Style';

const { TextArea } = Input;
const BlankPage = () => {
  return (
    <>
      <PageHeader
        title="Create Profile"
      />
      <Main>
        <div className="input-wrap">
          <Form name="horizontal-form" layout="horizontal">
            <Row gutter={25}>
              <Col md={12} sm={12} xs={24}>
                <Cards title="Basic">
                  <Row align="middle">
                    <Col lg={8} md={9} xs={24}>
                      <label htmlFor="name">Name</label>
                    </Col>
                    <Col lg={16} md={15} xs={24}>
                      <Form.Item name="name" initialValue="Duran Clayton">
                        <Input placeholder="Enter Name" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Cards>
                <Cards title="Textarea">
                  <TextArea rows={4} />
                </Cards>
              </Col>
              <Col md={12} sm={12} xs={24}>
                <Cards title="Three sizes of Input">
                  <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
                  <br />
                  <br />
                  <Input placeholder="default size" prefix={<UserOutlined />} />
                  <br />
                  <br />
                  <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
                </Cards>
              </Col>
            </Row>
          </Form>
        </div>
      </Main>
    </>
  );
};

export default BlankPage;
