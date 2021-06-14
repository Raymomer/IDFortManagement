import React, { Suspense, useState, useLayoutEffect, useEffect, lazy } from 'react';
import { Row, Col, Spin, Form, Table, Carousel, Skeleton, Collapse, Image, Tabs, Progress, Tooltip, Upload, Layout, Input, Select, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios'
import { render } from '@testing-library/react';
import { Link, NavLink, Route, useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { EmailWrapper } from './overview/style';
import { BasicFormWrapper, Main } from '../styled';
import { GalleryCard } from '../pages/style';

import { CardStyleWrapper } from '../ui-elements/ui-elements-styled';

import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Modal } from '../../components/modals/antd-modals';
import Heading from '../../components/heading/heading';


const GalleryCards = lazy(() => import('../pages/overview/GalleryCard'));

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option, OptGroup } = Select;
const { Dragger } = Upload;


const Email = ({ match }) => {
  console.log(match)
  const history = useHistory()

  console.log(history)

  const [isMailEditorOpen, setMailEditorStatus] = useState({
    editor: false,
    loading: false
  });

  const [scanSetting, setScanSetting] = useState({
    "profile": "",
    "face": "",
    "verifyName": "",
    "verifyDob": "",
    "verifyAge": "",
    "verifyAddress": "",
    "verifyPostcode": "",
    "verifyDocumentNumber": "",
    "verifyName": "",
    "ip": "",
    "customData": ""
  })

  const [scanDataSource, setScanDataSource] = useState("")

  const [state, setState] = useState({
    responsive: 0,
    collapsed: false,
  });


  const { responsive, collapsed } = state;
  const { path, params } = match;

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      setState({ responsive: width });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);


  const toggleCollapsed = () => {
    setState({
      ...state,
      collapsed: !collapsed,
    });
  };

  const toggleMailComposer = () => {
    setMailEditorStatus({ ...isMailEditorOpen, editor: !isMailEditorOpen['editor'] });
  };

  const closeMailComposr = () => {
    setMailEditorStatus({ editor: false, loading: false });
  };




  const [tableInfo, setTable] = useState({
    response: []
  })
  const [resultTable, setresultTable] = useState(``)
  console.log(tableInfo)

  const takeDataSource = (response) => {
    console.log(response)
    let source = []


    response['response'].map((element, idx) => {
      source.push({ "transactionId": element })
    })

    return source
  }

  const showResult = (result) => {
    console.log("transactionId => ", result['transactionId'])
    let r = {}
    r['response'] = result
    r['documentImage'] = result['outputImage']
    setresultTable(r)

  }


  const supported_fields = ["documentNumber", "personalNumber", "firstName", "middleName", "lastName", "fullName", "firstNameLocal", "middleNameLocal", "lastNameLocal", "fullNameLocal", "dob", "expiry", "issued", "sex", "height", "weight", "address1", "address2", "postcode", "placeOfBirth", "documentType", "documentName", "vehicleClass", "restrictions", "issueAuthority", "stateFull", "stateShort", "countryIso2", "countryFull", "countryIso3", "nationalityIso2", "nationalityFull", "optionalData", "optionalData2", "customdata1", "customdata2", "customdata3", "customdata4", "customdata5", "trustlevel", "trustnote", "docupass_reference", "image", "imagehash"];

  const TableList = ({ name }) => {

    console.log(scanSetting)
    let source = []
    switch (name) {
      case 'result': {
        Object.keys(resultTable.response.data).map(parameters => {
          resultTable.response.data[parameters].filter(i => i.index == 0).map(res => {
            if (supported_fields.includes(parameters)) {
              source.push(
                {
                  "parameters": parameters,
                  "value": [res.value, res.confidence]
                }
              );
            }
          })
        })
        return (
          <Table
            className="table-responsive"
            pagination={false}
            dataSource={source}
            columns={docColumns}
            showHeader={false} />
        )

      }
      case 'error': {
        if (resultTable.response.warning == undefined || resultTable.response.warning.length == 0) {
          return null
        }
        resultTable.response.warning.forEach(parameters => {
          console.log(parameters)
          source.push({
            "parameters": [parameters.code, parameters.description],
            "value": parameters.confidence
          })

        })
        console.log(source)

        return (
          <Table
            className="table-responsive"
            pagination={false}
            dataSource={source}
            columns={warnColumns}
            showHeader={false} />
        )
      }
    }
  }



  const LogList = () => {

    const columns = [
      {
        title: "Transaction ID",
        dataIndex: 'transactionId',
        key: 'transactionId',
        align: "center",
        render: (ele) => {
          return (
            <Button
              className="btn-icon btn-outlined"
              size="default"
              outlined
              type="light"
              style={{ width: "-webkit-fill-available" }}
              onClick={() => {
                showResult(ele)
              }}
            >
              {/* <FeatherIcon icon="layers" /> */}
              {ele['transactionId']}
            </Button>
          )
        }
      }
    ]


    let dataSource = takeDataSource(tableInfo)

    console.log(dataSource, columns)

    return (
      <Table
        className="table-responsive"
        dataSource={dataSource}
        columns={columns}
        tableLayout={'fixed'}
        pagination={{ pageSize: 10, position: ['bottomCenter'] }}
        onRow={(record, rewIndex) => {
          console.log(record, rewIndex)
        }}
      />
    )
  }


  const docColumns = [
    {
      title: 'Parameters',
      dataIndex: 'parameters',
      key: 'parameters',
      render: (ele) => {
        return (
          <div style={{ display: "-webkit-inline-box" }}>
            <span style={{ fontWeight: 800 }}>{ele}</span>
          </div>
        )
      }
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: ([value, confidence]) => {
        return (
          <div style={{ display: "-webkit-inline-box" }}>
            <span>{value}</span><span style={{
              "fontSize": "9px",
              "color": "#AAA",
              "marginLeft": "8px"
            }}>{confidence}</span>
          </div >
        )
      }
    },
  ]

  const warnColumns = [
    {
      width: "30%",
      title: 'Parameters',
      dataIndex: 'parameters',
      key: 'parameters',
      render: ([ele, discript]) => {
        return (
          <Tooltip title={discript}>
            <div style={{
              display: "-webkit-inline-box",
              overflowWrap: "anywhere"
            }}>
              <span style={{ fontWeight: 800 }}>{ele}</span>
            </div>
          </Tooltip>
        )
      }
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (confidence) => {
        let number = parseInt(confidence * 100)
        return (
          <Progress
            percent={number}
            style={{ marginBottom: '15px' }}
            strokeColor={{
              '0%': '#FF3030',
              '100%': '#FF3030',
            }}
            status={number === 100 ? 'exception' : null
            }
          />
        )
      }
    },
  ]
  const setColumns = [
    {
      title: 'Parameters',
      dataIndex: 'parameters',
      key: 'parameters',
      align: "center",
      render: (ele) => {
        return (
          <span>{ele.replace(/^./, ele[0].toUpperCase())}</span> // 首字轉大寫
        )
      }
    },
    {
      title: 'Value',
      align: "center",
      dataIndex: 'value',
      key: 'value'
    },
  ]

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


  const scan = async (name) => {

    setMailEditorStatus({ ...isMailEditorOpen, loading: true })
    console.log("Start to Scan")

    let r = {}
    let base64arr
    let frontImage = []
    if (name == 'single') {
      if (document.querySelector('#document').files.length > 0) {
        let base64str = await toBase64(document.querySelector('#document').files[0])
        base64str = base64str.split("base64,")

        console.log(base64str)
        frontImage.push(base64str[1])
      }

      if (document.querySelector('#documentBack').files.length > 0) {
        let base64str = await toBase64(document.querySelector('#documentBack').files[0])
        base64arr = base64str.split("base64,")
        r["documentBack"] = base64arr[1]
      }

      if (document.querySelector('#face').files.length > 0) {
        let base64str = await toBase64(document.querySelector('#face').files[0])
        base64arr = base64str.split("base64,")
        r["face"] = base64arr[1]
      }
    } else {
      let len = document.querySelector('#documentMultiple').files.length - 1
      if (len > 0) {
        while (len >= 0) {
          let base64str = await toBase64(document.querySelector('#documentMultiple').files[len])
          console.log(base64str)
          base64str = base64str.split("base64,")
          frontImage.push(base64str[1])
          len--
        }
      }
    }

    r["profile"] = '60c6b587450f25aa534c258a'

    let url = "https://192.168.0.104/transaction"
    console.log(base64arr)
    while (frontImage.length) {

      console.log(frontImage.length)
      r['document'] = frontImage[frontImage.length - 1]
      console.log(r)
      let postData = new Promise((resolve, reject) => {
        axios.post(url, r, {
          headers: {
            Authorization: "Bearer KTYUTnlX6pFB2tOHva7jhxbi4PvGAHLIx5Q0dGEalVE=",
          }
        }).then(function (res) {
          let response = res.data
          let docImage = {}
          console.log(response['outputImage'])
          if (response['outputImage'] == undefined) {
            try {
              r["document"] != undefined ? docImage['front'] = "data:image/png;base64," + r["document"] : null
              r["documentBack"] != undefined ? docImage['back'] = "data:image/png;base64," + r["documentBack"] : null
              r["face"] != undefined ? docImage['face'] = "data:image/png;base64," + r["face"] : null
            } catch {

            }
            response['outputImage'] = docImage
          }
          response['scanTime'] = new Date().toLocaleDateString()

          Object.keys(response.data).map(parameters => {

            if (!supported_fields.includes(parameters)) {
              delete response.data[parameters]
            }

          })

          tableInfo['response'].push(response)
          console.log(tableInfo['response'])
          resolve()
        }).catch(function (error) {
          console.log(error)
          resolve()
        });
      })

      await postData.then(
        frontImage.pop()
      )



    }
    closeMailComposr()
  }


  const pathName = path.split(':')[0];

  useEffect(() => {


    let url = "https://192.168.0.104/profile"
    axios.get(url, {
      headers: {
        Authorization: "Bearer KTYUTnlX6pFB2tOHva7jhxbi4PvGAHLIx5Q0dGEalVE=",
      }
    }).then(profileList => {
      let source = []
      let data = []

      profileList.data.forEach(info => {
        source.push(info.id)
      })

      console.log(scanSetting)
      Object.keys(scanSetting).forEach(name => {

        if (name == "profile") {
          data.push({
            "parameters": name,
            "value": (
              <Select
                style={{ "width": "-webkit-fill-available" }}
                defaultValue={source[0]}
              >
                {source.map(ele => {
                  return (
                    <Option value={ele}>{ele}</Option>
                  )
                })}
              </Select>
            )
          })
        } else {
          data.push({
            "parameters": name,
            "value": (
              <Input size="middle" placeholder={scanSetting[name]} />
            )
          })
        }
      })
      console.log(data)
      setScanSetting({ ...scanSetting, profile: source[0] })
      setScanDataSource(data)

    }).catch(err => {
      console.log(err)
    })



  }, [])


  useEffect(() => {
    if (history.location.state != null) {
      setTable(history.location.state.tableInfo)
    }
  }, [history])

  console.log(scanSetting)
  console.log(resultTable)
  return (

    <>
      <PageHeader
        ghost
        title={

          <div style={{ display: "inline-flex" }}>
            <p>Scan</p>
            <Button
              className="mb-25"
              style={{
                justifyContent: "right",
                border: "dashed",
                width: "auto"
              }}
              onClick={toggleMailComposer}
              transparented
              type="light"
              size="default"
              block>
              <FeatherIcon icon="plus" size={18} />Upload
            </Button>
          </div>

        }
      />
      <Modal
        type={`primary`}
        footer={null}
        visible={isMailEditorOpen.editor}
        onCancel={closeMailComposr}
        style={{ height: "500px" }}
      >
        <Spin spinning={isMailEditorOpen.loading}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Single" key="1">
              <BasicFormWrapper>
                <Form style={{ width: '100%', position: "inherit", }} name="info" colon={false} >
                  <Cards border headless>
                    <Form.Item
                      label={
                        <div>
                          <h5 style={{ fontSize: "20px" }}>Front of Document</h5>
                          <p>Please upload image of the document.</p>
                        </div>
                      }>
                      <CardStyleWrapper>
                        <Cards border={false} headless>
                          <Row justify="center">
                            <input
                              type="file"
                              id="document"
                              style={{ width: "100%" }}
                            >
                            </input>
                          </Row>
                        </Cards>
                      </CardStyleWrapper>
                    </Form.Item>
                  </Cards>
                  <Cards border headless>
                    <Form.Item
                      label={
                        <div>
                          <h5 style={{ fontSize: "20px" }}>Back of Document</h5>
                          <p>To perform dual-side scan, supply image to back of the document.</p>
                        </div>
                      }>
                      <CardStyleWrapper>
                        <Cards border={false} headless>
                          <Row justify="center">
                            <input
                              type="file"
                              id="documentBack"
                              style={{ width: "100%" }}
                            >
                            </input>
                          </Row>
                        </Cards>
                      </CardStyleWrapper>
                    </Form.Item>
                  </Cards>
                  <Cards border headless>
                    <Form.Item
                      label={
                        <div>
                          <h5 style={{ fontSize: "20px" }}>Face</h5>
                          <p>To perform dual-side scan, supply image to face.</p>
                        </div>
                      }>
                      <CardStyleWrapper>
                        <Cards border={false} headless>
                          <Row justify="center">
                            <input
                              type="file"
                              id="face"
                              style={{ width: "100%" }}
                            >
                            </input>
                          </Row>
                        </Cards>
                      </CardStyleWrapper>
                    </Form.Item>
                  </Cards>

                </Form>
              </BasicFormWrapper>
              <div className="add-user-bottom text-right">
                <Button onClick={() => { scan('single') }} htmlType="submit" type="primary">
                  <Link to="#">Scan</Link>
                </Button>
              </div>
            </TabPane>
            <TabPane tab="Mutiple" key="2">
              <BasicFormWrapper>
                <Form style={{ width: '100%', position: "inherit", }} name="info" colon={false} >
                  <Cards border headless>
                    <Form.Item label=
                      {
                        <div>
                          <h5 style={{ fontSize: "20px" }}>Front of Document</h5>
                          <p>Please upload images of the document.</p>
                        </div>
                      }>
                      <CardStyleWrapper>
                        <Cards border={false} headless>
                          <Row justify="center">
                            <input
                              type="file"
                              id="documentMultiple"
                              style={{ width: "100%" }}
                              multiple
                            >
                            </input>
                          </Row>
                        </Cards>
                      </CardStyleWrapper>
                    </Form.Item>
                  </Cards>
                </Form>
              </BasicFormWrapper>
              <div className="add-user-bottom text-right" style={{ paddingTop: "5%" }}>
                <Button onClick={() => { scan('mutiple') }} htmlType="submit" type="primary">
                  <Link to="#">Scan</Link>
                </Button>
              </div>
            </TabPane>
            <TabPane tab="Setting" key="3">
              <Table
                style={{ height: "600px" }}
                scroll={{ y: 500 }}
                className="table-responsive"
                dataSource={scanDataSource}
                columns={setColumns}
                pagination={false}
              />
            </TabPane>
          </Tabs>
        </Spin>
      </Modal >

      <Main>





        {tableInfo == '' ?
          <></> :
          <Main>
            <Row gutter={25}>

              {
                tableInfo.response.map((res, id) => {
                  console.log(res)
                  return (
                    <Col key={id} xxl={6} lg={8} sm={12} xs={24} >
                      <Suspense
                        fallback={
                          <Cards headless>
                            <Skeleton active />
                          </Cards>
                        }
                      >
                        <GalleryCard style={{ marginBottom: '25px' }}>
                          <NavLink to={{ pathname: "/admin/main/chat/", query: { tableInfo, index: id } }} >
                            <figure>


                              <div style={{
                                height: "250px",
                                width: "90%",
                                margin: "auto",
                                backgroundImage: `url(${res.outputImage['front']})`,
                                backgroundPosition: "center",
                                backgroundSize: "contain",
                                backgroundAttachment: "local",
                                backgroundRepeat: "no-repeat"
                              }}>
                              </div>
                              {/* <img style={{ width: '50%' }} src={res.outputImage['front']} alt="" /> */}
                              <figcaption>
                                <div className="gallery-single-content">
                                  <Heading className="gallery-single-title" as="h4">
                                    <p>Scan time : <span style={{ color: '#000' }}>{res.scanTime}</span></p>
                                    <p>decision : <span style={{ color: '#000' }}>{res.decision}</span></p>
                                  </Heading>

                                </div>
                              </figcaption>
                            </figure>
                          </NavLink>
                        </GalleryCard>
                      </Suspense>
                    </Col>
                  )
                })
              }


            </Row>
          </Main>

        }

      </Main>
    </>
  );
};

Email.propTypes = {
  match: propTypes.object,
};

export default Email;
