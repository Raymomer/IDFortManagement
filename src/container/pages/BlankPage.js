import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Row, Col, Form, Input, Select, Table, Tooltip, InputNumber, Checkbox, Divider } from 'antd';
import { useParams } from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, BasicFormWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Popover } from '../../components/popup/popup';
import { Button } from '../../components/buttons/buttons';
import { Slider } from '../../components/slider/slider';
import { AddProductForm } from '../ecommerce/Style';

import DEFAULT from '../../demoData/default.json';
import ProfileItem from '../../demoData/profileItem.json';
import axios from 'axios';

const { Option } = Select;
// Slider Mark
const marks = {
  0: '0',
  0.5: '0.5',
  1: {
    style: {
      color: '#f50',
    },
    label: <strong>1</strong>,
  },
};
// Decision Slider Mark
const decisionsMark = {
  "-0.1": {
    style: {
      color: '#f50',
    },
    label: <strong>close</strong>
  },
  0: '0',
  0.5: '0.5',
  1: '1'
};



const BlankPage = (props) => {


  axios.defaults.headers.common.Authorization = 'Apikey QjkTjXuc5Gg6fK1T+w991Asu1oW+Nmn5ag613s/8sgM=';
  // console.log(props);
  const [form] = Form.useForm();
  const mounted = useRef();
  // default first
  const [state, setState] = useState(DEFAULT);
  // const [tableData, setTableData] = useState('');


  const profileId = props.location.pathname.split("/")[3];

  // const getProfile = () => {
  //   if (profileId != null) {
  //     axios({
  //       method: 'GET',
  //       url: `https://192.168.0.104/profile/${profileId}`
  //     }).then(res => {
  //       console.log("Edit", res.data);
  //       setState(res.data);
  //       console.log("After", state);
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //   } else {
  //     setState(DEFAULT);
  //     console.log("not edit");
  //   }
  // }




  // console.log(state)

  // profile item 每個物件
  const item = ProfileItem;

  const OPTIONS = ['documentNumber', 'face', 'hairColor', 'eyeColor', 'dob', 'address1', 'address2'];




  const onChange = name => event => {
    event.stopPropagation()
    console.log("start event...");
    setState({
      ...state,
      [name]: event
    });
    console.log(state);
  };

  // table data

  const tableData = []

  let filteredOptions

  if (state != undefined) {

    item.decisions.forEach((i) => {

      tableData.push({
        key: i.key,
        enabled: (
          <Checkbox
            defaultChecked={state.decisions[i.name].enabled}
            onChange={() => {
              let upgrade = state
              upgrade.decisions[i.name].enabled = !upgrade.decisions[i.name].enabled
              setState(upgrade)
            }} />
        ),
        name: i.name,
        label: i.label,
        tooltip: i.tooltip,
        review: (
          <Slider
            marks={decisionsMark}
            defaultValue={state.decisions[i.name].review}
            min={-0.1}
            max={1}
            step={0.01}
            onAfterChange={(val) => {
              let upgrade = state
              upgrade.decisions[i.name].review = val
              setState(upgrade)
              console.log(state);
            }} />
        ),
        reject: (
          <Slider
            marks={decisionsMark}
            defaultValue={state.decisions[i.name].reject}
            min={-0.1}
            max={1}
            step={0.01}
            onAfterChange={(val) => {
              let upgrade = state
              upgrade.decisions[i.name].reject = val
              setState(upgrade)
              console.log(state);
            }} />
        ),
        weight: (
          <InputNumber
            defaultValue={state.decisions[i.name].weight}
            min={0}
            max={1}
            step={0.01}
            onAfterChange={(val) => {
              let upgrade = state
              upgrade.decisions[i.name].weight = val
              setState(upgrade)
              console.log(state);
            }} />
        )
      })
    });

    filteredOptions = OPTIONS.filter(o => state.obscure ? (!state.obscure.includes(o)) : null);

  }
  // table title



  const columns = [
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      key: 'enabled',
      width: '10%',
    },
    {
      title: 'Code',
      dataIndex: 'label',
      key: 'code',
      width: '30%',
      render: code => (
        <Tooltip placement="topLeft" title={item.decisions[item.decisions.map((item) => { return item.label }).indexOf(code)].tooltip}>
          {code}
        </Tooltip>
      ),
    },
    {
      title: 'Review',
      dataIndex: 'review',
      key: 'review',
      width: '30%'
    },
    {
      title: 'Reject',
      dataIndex: 'reject',
      key: 'reject',
      width: '30%'
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      width: '10%'
    }
  ];

  const selectItem = {
    outputType: [
      {
        label: "Base 64",
        value: "base64"
      },
      {
        label: "URL",
        value: "url"
      }
    ]
  }


  const saveProfile = () => {

    // console.log(state)
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/profile`, { options })
      .then(res => {
        if (res.data.success) {
          console.log(res.data.id);
          alert('success');
          // window.reload...etc
        } else {
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const BaseList = () => {
    console.log(item)

    return (
      <Row gutter={30}>
        {    item['basic'].map((u, i) => {
          return (
            (u.type == "input") ?
              <Col sm={12} xs={24} className="mb-25">
                <Form.Item
                  key={i}
                  label={u.label}
                  name={u.name}
                  tooltip={u.tooltip}>
                  <Input
                    defaultValue={state[u.name]}
                    onChange={onChange(u.name)} />
                </Form.Item>
              </Col>
              :
              (u.type == "pick") ?
                <Col sm={12} xs={24} className="mb-25">
                  <Form.Item
                    key={i}
                    label={u.label}
                    name={u.name}
                    initialValue={state[u.name]}

                    tooltip={u.tooltip}>
                    <Select
                      size="large"
                      className="sDash_fullwidth-select"
                      onChange={onChange(u.name)}
                      options={selectItem[u.name]}>
                    </Select>
                  </Form.Item>
                </Col>
                :
                (u.type == "multi-pick") ?
                  <Col sm={12} xs={24} className="mb-25">
                    <Form.Item
                      key={i}
                      name={u.name}
                      initialValue={state[u.name]}
                      label={u.label}
                      tooltip={u.tooltip}>
                      <Select
                        mode="multiple"
                        placeholder={u.placeholder}
                        value={state[u.name]}
                        onChange={onChange(u.name)}
                        style={{ width: '100%' }}
                      >
                        {filteredOptions.map(item => (
                          <Select.Option key={item} value={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  :
                  (u.type == "switch") ?
                    <Col sm={8} xs={12} className="mb-25">
                      <Row className="mb-25">
                        <Col lg={23} md={23} xs={23}>
                          <Tooltip
                            placement="topRight"
                            title={u.tooltip}>
                            <label htmlFor="name">{u.label}</label>
                          </Tooltip>
                        </Col>
                        <Col lg={1} md={1} xs={1}>
                          <Form.Item key={i} name={u.name}>
                            <Checkbox defaultChecked={state[u.name]} onChange={onChange(u.name)} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    : null
          )
        })}
      </Row>)

  }


  useEffect(() => {

    const getProfile = async () => {

      console.log("Run getProfile =>", profileId)
      return new Promise((resolve, reject) => {

        axios({
          method: 'GET',
          url: `https://192.168.0.104/profile/${profileId}`,
          headers: {
            Authorization: "Bearer lQuVANCXht0IS9bYsMY2+pM9Z9/aE5E0aVIHbYF9aeY=",

          }
        }).then(res => {
          console.log("Edit", res.data);
          setState(res.data)
          resolve(res.data);
        }).catch(err => {
          console.log(err);
        })
      })

    }

    if (profileId != null) {
      getProfile()
    }


  }, [])



  console.log("Loading!")
  return (
    <>
      <PageHeader
        ghost
        title={profileId != null ? "Edit Profile" : "Create Profile"}
        buttons={[
          <div key="1" className="page-header-actions">
            <Button
              type="primary"
              onClick={saveProfile}>
              Save</Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Form
              style={{ width: '100%' }}
              name="settings"
            >
              <div className="mb-4">
                <Cards headless>
                  <Row gutter={16}>
                    <Col lg={12} sm={24} md={12} xs={24}>
                      <AddProductForm>
                        <BasicFormWrapper>
                          <div className="add-product-block">
                            <div className="add-product-content">
                              <Cards headless>
                                <Row gutter={30}>
                                  <BaseList />
                                </Row>
                                <Divider />
                                <Tooltip
                                  placement="topLeft"
                                  title="This score will determine whether it needs to be manually reviewed or rejected in the end.">
                                  <h2 className="user-info__title">Decision Trigger</h2>
                                </Tooltip>
                                <Row gutter={30}>
                                  {
                                    item['decisionTrigger'].map((u, i) => {
                                      return (
                                        <Col sm={12} xs={24} className="mb-25">
                                          <Form.Item label={u.label} name={u.name} initialValue={state.decisionTrigger[u.name]} tooltip={u.tooltip}>
                                            <Input
                                              placeholder={u.placeholder}
                                              onChange={(e) => {
                                                console.log("start event...");
                                                let upgrade = state
                                                upgrade['decisionTrigger'][u.name] = e.target.value
                                                setState(upgrade)
                                                console.log(state);
                                              }} />
                                          </Form.Item>
                                        </Col>
                                      )
                                    })
                                  }
                                </Row>
                              </Cards>
                            </div>
                          </div>
                        </BasicFormWrapper>
                      </AddProductForm>
                    </Col>
                    <Col lg={12} sm={24} md={12} xs={24}>
                      <AddProductForm>
                        <BasicFormWrapper>
                          <div className="add-product-block">
                            <div className="add-product-content">
                              <Cards headless>
                                <Tooltip
                                  placement="topLeft"
                                  title="The score will be a float between 0 to 1. Strict condition will have a score closer to 1 while loose will have a score closer to 0.">
                                  <h2 className="user-info__title">Thresholds</h2>
                                </Tooltip>
                                <Row gutter={30}>
                                  {
                                    item['thresholds'].map((u, i) => {
                                      return (
                                        <Col sm={12} xs={24} className="mb-25">
                                          <Form.Item name={u.name}>
                                            <h3>{u.label}</h3>
                                            <Slider
                                              marks={marks}
                                              defaultValue={state.thresholds[u.name]}
                                              min={0}
                                              max={1}
                                              step={0.1}
                                              onAfterChange={(val) => {
                                                let upgrade = state
                                                upgrade['thresholds'][u.name] = val
                                                setState(upgrade)
                                              }} />
                                          </Form.Item>
                                        </Col>
                                      )
                                    })
                                  }
                                </Row>
                              </Cards>
                            </div>
                          </div>
                        </BasicFormWrapper>
                      </AddProductForm>
                    </Col>
                  </Row>
                </Cards>
              </div>
              <Cards title="Decisions">
                <Table
                  className="table-responsive"
                  dataSource={tableData}
                  columns={columns}
                  pagination={false}
                  scroll={{ x: 1500 }}
                />
              </Cards>
            </Form>
          </Col>
        </Row>
      </Main>
    </>

  )
}








export default BlankPage;
