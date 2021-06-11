import React, { useState, lazy, Suspense, useLayoutEffect, useEffect } from 'react';
import { Row, Col, Spin, Form, Table, Carousel, Collapse, Tabs, Progress, Tooltip, Layout, Input, Select } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import EmailNavbar from './overview/Navbar';
import ComposeMail from './overview/Compose';
import { EmailWrapper, MailSideBar } from './overview/style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { BasicFormWrapper, Main } from '../styled';

import { Button } from '../../components/buttons/buttons';
import { Modal, alertModal } from '../../components/modals/antd-modals';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';




import { render } from '@testing-library/react';
import axios from 'axios'



const Inbox = lazy(() => import('./overview/Inbox'));
const Sent = lazy(() => import('./overview/Sent'));
const Draft = lazy(() => import('./overview/Draft'));
const Starred = lazy(() => import('./overview/Starred'));
const Trash = lazy(() => import('./overview/Trash'));
const Spam = lazy(() => import('./overview/Spam'));
const MailDetailView = lazy(() => import('./overview/MailDetailView'));


const { TabPane } = Tabs;
const { Panel } = Collapse;
const { header, Footer, Sider, Content } = Layout;
const { Option, OptGroup } = Select;


const Email = ({ match }) => {
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
      source.push(
        {
          "transactionId": element
        }
      )
    })

    return source
  }

  const showResult = (result) => {
    console.log("transactionId => ", result['transactionId'])
    console.log(result)
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

          <Table className="table-responsive" pagination={false} dataSource={source} columns={docColums} showHeader={false} />

        )

      }
      case 'error': {
        if (resultTable.response.warning.length == 0) {
          return
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

          <Table className="table-responsive" pagination={false} dataSource={source} columns={warnColums}

            showHeader={false} />

        )
      }




    }

  }

  const ImageList = ({ index, name }) => {
    console.log(index, name)
    // const insert = insertlabel(index)

    return (
      <div style={{
        position: "relative", width: "500px"
      }}>



        <img style={{
          maxWidth: "500px",
          height: "auto",
        }} src={resultTable.documentImage[name]} alt="" />
        {/* 
        {
          insert.map(ele => {
            return ele
          })
        } */}

      </div>
    )
  }


  const LogList = () => {

    const columns = [

      {
        title: "TransactionId",
        dataIndex: 'transactionId',
        key: 'transactionId',
        render: (ele) => {
          return (
            <Button className="btn-icon btn-outlined" size="default" outlined type="light"
              style={{
                width: "-webkit-fill-available"
              }}
              onClick={() => {
                showResult(ele)
              }}
            >
              <FeatherIcon icon="layers" />
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


  const docColums = [
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

  const warnColums = [
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
  const setClumns = [
    {
      title: 'Parameters',
      dataIndex: 'parameters',
      key: 'parameters',
      align: "center",
      render: (ele) => {
        return (
          <div style={{ display: "-webkit-inline-box" }}>
            <span style={{ fontWeight: 700, fontSize: "20px" }}>{ele}</span>
          </div>
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
    let base64arr = []
    if (name == 'single') {
      if (document.querySelector('#document').files.length > 0) {
        let base64str = await toBase64(document.querySelector('#document').files[0])
        base64arr = base64str.split("base64,")
        base64arr = [base64arr[1]]
      }


      if (document.querySelector('#documentBack').files.length > 0) {
        let base64str = await toBase64(document.querySelector('#documentBack').files[0])
        base64arr = base64str.split("base64,")
        r["documentBack"] = base64arr[1]
      }
    } else {
      let len = document.querySelector('#documentMutiple').files.length - 1
      if (len > 0) {
        while (len >= 0) {
          let base64str = await toBase64(document.querySelector('#documentMutiple').files[len])
          console.log(base64str)
          base64str = base64str.split("base64,")
          base64arr.push(base64str[1])
          len--
        }
      }
    }

    r["profile"] = '60c171dd74334f0fd274733c'

    let url = "http://192.168.0.104/"

    while (base64arr.length) {

      console.log(base64arr.length)
      r['document'] = base64arr[base64arr.length - 1]

      let postData = new Promise((resolve, reject) => {
        axios.post(url, r, {
          headers: {
            Authorization: "Apikey xDojvTLsDYueA7/WTkh27vKRob/b7sFtY2IIQM7uQC8=",
          }
        }).then(function (res) {
          let response = res.data
          let docImage = {}
          console.log(response['outputImage'])
          if (response['outputImage'] == undefined) {
            try {
              r["document"] != undefined ? docImage['front'] = r["document"] : null
              r["documentBack"] != undefined ? docImage['back'] = r["documentBack"] : null
            } catch {

            }
            response['outputImage'] = docImage
          }



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
        base64arr.pop()
      )



    }
    closeMailComposr()
  }


  const pathName = path.split(':')[0];


  useEffect(() => {


    let url = "https://192.168.0.104/profile"
    axios.get(url, {
      headers: {
        Authorization: "Apikey xDojvTLsDYueA7/WTkh27vKRob/b7sFtY2IIQM7uQC8=",
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
                style={{
                  "width": "-webkit-fill-available"
                }}

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

  console.log(scanSetting)

  return (

    <>
      <PageHeader
        ghost
        title={`Scan`}
      />
      <Modal
        type={`primary`}
        footer={null}
        visible={isMailEditorOpen.editor}
        onCancel={closeMailComposr}
      >
        <Spin spinning={isMailEditorOpen.loading}>
          <Tabs
            defaultActiveKey="1"

          >
            <TabPane tab="Single" key="1">
              <BasicFormWrapper>



                <Form style={{ width: '100%', position: "inherit", }} name="info" colon={false} >


                  <Form.Item label=
                    {
                      <div>
                        <h5 style={{ fontSize: "20px" }}>Front of Document</h5>
                        <p>Please upload image of the document or enter url to remote document image.</p>
                      </div>
                    }>

                    <Row align="middle" >

                      <Col lg={8} md={9} xs={24}>
                        <label htmlFor="name">Document Image - Front</label>
                      </Col>
                      <Col lg={16} md={15} xs={24}>

                        <input type="file" id="document" className="form-control"></input>

                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label=
                    {
                      <div>
                        <h5 style={{ fontSize: "20px" }}>Back of Document</h5>
                        <p>To perform dual-side scan, supply image to back of the document.</p>
                      </div>
                    }>

                    <Row align="middle" >

                      <Col lg={8} md={9} xs={24}>
                        <label htmlFor="name">Document Image - Back</label>
                      </Col>
                      <Col lg={16} md={15} xs={24}>

                        <input type="file" id="documentBack" className="form-control"></input>

                      </Col>
                    </Row>
                  </Form.Item>

                </Form>
              </BasicFormWrapper>
              <div className="add-user-bottom text-left" style={{ paddingTop: "5%" }}>

                <Button onClick={() => {
                  scan('single')

                }} htmlType="submit" type="primary">

                  <Link to="#">Scan</Link>

                </Button>

              </div>

            </TabPane>
            <TabPane tab="Mutiple" key="2">
              <BasicFormWrapper>



                <Form style={{ width: '100%', position: "inherit", }} name="info" colon={false} >


                  <Form.Item label=
                    {
                      <div>
                        <h5 style={{ fontSize: "20px" }}>Front of Document</h5>
                        <p>Please upload image of the document or enter url to remote document image.</p>
                      </div>
                    }>

                    <Row align="middle" >

                      <Col lg={8} md={9} xs={24}>
                        <label htmlFor="name">Document Image - Front</label>
                      </Col>
                      <Col lg={16} md={15} xs={24}>

                        <input type="file" id="documentMutiple" className="form-control" multiple></input>

                      </Col>
                    </Row>
                  </Form.Item>

                </Form>
              </BasicFormWrapper>
              <div className="add-user-bottom text-left" style={{ paddingTop: "5%" }}>

                <Button onClick={() => {
                  scan('mutiple')

                }} htmlType="submit" type="primary">

                  <Link to="#">Scan</Link>

                </Button>

              </div>

            </TabPane>

            <TabPane tab="setting" key="3">
              <Table
                className="table-responsive"
                dataSource={scanDataSource}
                columns={setClumns}
                pagination={false}
              />
            </TabPane>


          </Tabs>
        </Spin>


      </Modal >

      <Main>
        <EmailWrapper>
          <Row className="justify-content-center" gutter={25} wrap={true}>
            <Col className="trigger-col" xxl={5} xl={7} lg={8} xs={24}>
              {responsive <= 991 && (
                <Button type="link" className="mail-sidebar-trigger" style={{ marginTop: 0 }} onClick={toggleCollapsed}>
                  <FeatherIcon icon={collapsed ? 'align-left' : 'align-right'} />
                </Button>
              )}

              {responsive > 991 ? (
                <div className="mail-sideabr">

                  <Cards headless>
                    <div className="mail-sidebar-top">
                      <Button onClick={toggleMailComposer} shape="round" type="primary" size="default" block>
                        <FeatherIcon icon="plus" size={18} /> Scan - FullPage
                      </Button>
                    </div>

                    <LogList />

                  </Cards>
                </div>
              ) : (
                <MailSideBar className={collapsed ? 'mail-sideabr show' : 'mail-sideabr hide'}>
                  <Cards headless>
                    <Button
                      type="link"
                      className="mail-sidebar-trigger trigger-close"
                      style={{ marginTop: 0 }}
                      onClick={toggleCollapsed}
                    >
                      <FeatherIcon icon="x" />
                    </Button>
                    <div className="mail-sidebar-top">
                      <Button onClick={toggleMailComposer} shape="round" type="primary" size="default" block>
                        Scan
                      </Button>
                    </div>

                    <div className="mail-sidebar-bottom">
                      <EmailNavbar path={pathName} toggleCollapsed={toggleCollapsed} />
                    </div>
                  </Cards>
                </MailSideBar>
              )}
            </Col>

            <Col xxl={19} xl={17} lg={16}>
              {resultTable == '' ? <></> :
                <Cards title="Response" border={false} size="default" >
                  <Row gutter={30} justify="center">

                    <Col md={12}>


                      <Carousel
                        // afterChange={onChange}
                        dotPosition={'bottom'}
                        style={{
                          textAlign: "-webkit-center",
                          background: '#364d79',
                          height: "350px",
                          width: "500px"

                        }}
                      >

                        {
                          Object.keys(resultTable.documentImage).map((i, idx) => {
                            return (
                              <div>
                                <ImageList index={idx} name={i} style={{
                                  textAlign: "-webkit-center",
                                }} />

                              </div>
                            )

                          })
                        }
                        <div style={{ width: "300px", height: "500px", backgroundColor: '#000' }}>

                        </div>
                        <div style={{ width: "300px", height: "500px", backgroundColor: '#000' }}>

                        </div>
                      </Carousel>

                      <Collapse defaultActiveKey={['1']} style={
                        {
                          marginTop: "3%"
                        }
                      }>
                        <Panel header="Error" key="1">
                          <TableList name={'error'} />
                        </Panel>
                      </Collapse>


                    </Col>


                    <Col md={7}>
                      <Collapse defaultActiveKey={['1']}
                      >
                        <Panel header="Result" key="1">
                          <TableList name={'result'} />
                        </Panel>
                      </Collapse>
                    </Col>
                  </Row>


                </Cards>
              }




            </Col>
          </Row>
        </EmailWrapper>
      </Main>
    </>
  );
};

Email.propTypes = {
  match: propTypes.object,
};

export default Email;
