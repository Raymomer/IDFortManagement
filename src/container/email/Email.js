import React, { Suspense, useState, useLayoutEffect, useEffect } from 'react';
import { Row, Col, Spin, Form, Table, Skeleton, Tabs, Input, Select, message, Pagination } from 'antd';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/authentication/actionCreator';
import { profileUpdate, scanSetSaving, scanResponseSaving } from '../../redux/scan/actionCreator';
import { Link, NavLink, Route, useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { BasicFormWrapper, Main } from '../styled';
import { GalleryCard } from '../pages/style';
import { CardStyleWrapper } from '../ui-elements/ui-elements-styled';

import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Modal } from '../../components/modals/antd-modals';
import Heading from '../../components/heading/heading';



const { TabPane } = Tabs;
const { Option, OptGroup } = Select;


const Email = ({ match }) => {

  const history = useHistory()
  const dispatch = useDispatch();
  // get token
  const token = Cookies.get('4pToken');
  const apiPath = Cookies.get('ApiEnd');
  // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.defaults.headers.common.Authorization = `Bearer 0iu3kPIsLXDta/GRJ1LfDuDNPZYVDcOz8WOMMJ74PPY=`

  const [isMailEditorOpen, setMailEditorStatus] = useState({
    editor: false,
    loading: false
  });
  const { scanSetting, scanDataSource, tableInfo } = useSelector(state => {
    console.log(state)
    return {
      scanSetting: state.scanSet.data,
      scanDataSource: state.scanSetSaving.data,
      tableInfo: { response: state.scanResponse.data }
    };
  });

  console.log(scanDataSource)

  const [state, setState] = useState({
    responsive: 0,
    collapsed: false,
  });


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


  const toggleMailComposer = () => {
    setMailEditorStatus({ ...isMailEditorOpen, editor: !isMailEditorOpen['editor'] });
  };

  const closeMailComposr = () => {
    setMailEditorStatus({ editor: false, loading: false });
  };




  const [pageinfo, setPage] = useState({
    current: 1,
    pageSize: 8
  })

  const changePage = (current, pageSize) => {
    setPage({ ...pageinfo, current: current })
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


  const scan = async (name) => {

    setMailEditorStatus({ ...isMailEditorOpen, loading: true })
    console.log("Start to Scan")
    console.log(scanSetting);
    let r = {}
    let base64arr
    let frontImage = []
    if (name == 'single') {
      if (document.querySelector('#document').files.length > 0) {
        let base64str = await toBase64(document.querySelector('#document').files[0])
        base64str = base64str.split("base64,")

        console.log(base64str)
        frontImage.push({ fileName: document.querySelector('#document').files[0].name, image: base64str[1] })
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
          frontImage.push({ fileName: document.querySelector('#documentMultiple').files[len].name, image: base64str[1] })
          len--
        }
      }
    }

    let url = `${apiPath}/transaction`
    console.log(base64arr)
    while (frontImage.length) {
      let name = frontImage[frontImage.length - 1].fileName;
      console.log(frontImage.length)
      r['document'] = frontImage[frontImage.length - 1].image;
      console.log(r)
      let postData = new Promise((resolve, reject) => {
        axios.post(url, { ...r, ...scanDataSource }).then(function (res) {
          console.log(res);
          let response = {}


          response['result'] = res.data
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
            response['outputImage_from'] = 'input'
          } else {
            response['outputImage_from'] = 'output'
            Object.keys(response['outputImage']).map(ele => {
              let str = response['outputImage'][ele].slice(0, 15)
              if (!str.includes('http')) {
                response['outputImage'][ele] = "data:image/png;base64," + response['outputImage'][ele]
              }
            })
          }
          let date = new Date()
          response['scanTime'] = date.toLocaleDateString() + " " + date.toLocaleTimeString()
          response['name'] = name
          console.log(response)
          dispatch(scanResponseSaving(response))
          // tableInfo['response'].unshift(response)
          // console.log(tableInfo['response'])
          resolve()

        }).catch(function (error) {
          if (err.response.status === 401) {
            message.error("Login timeout expired", 3)
            setTimeout(() => {
              dispatch(logOut());
            }, 3000)
          } else {
            console.log(err);
            message.error("Error", 3)
          }
        });
      })

      await postData.then(
        frontImage.pop()
      )
    }
    closeMailComposr()
  }

  const onChange = name => event => {
    // console.log("start event...");
    let upgrade = state;
    upgrade[name] = event;
    setScanSetting(upgrade)
  };

  useEffect(() => {


    let url = `${apiPath}/profile`
    console.log(url)
    axios.get(url).then(profileList => {
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
                onChange={onChange("profile")}
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
      dispatch(profileUpdate(source))
      dispatch(scanSetSaving({ "profile": source[0] }))

    }).catch(err => {
      console.log(err)
      if (err.response.status === 401) {
        message.error("Login timeout expired", 3)
        setTimeout(() => {
          dispatch(logOut());
        }, 3000)
      } else {
        console.log(err);
        message.error("Error", 3)
      }
    })



  }, [])


  const saveSetting = (e) => {
    console.log(e.target.id)
    console.log(e.target.value)

    let dic = {}
    dic[e.target.id] = e.target.value
    dispatch(scanSetSaving(dic))

  }

  const SettingList = () => {
    let profileId = scanSetting[`profile`][0]
    console.log(scanDataSource)

    if (scanDataSource.profile != null) {
      profileId = scanDataSource.profile
    }
    return (
      <>

        {
          Object.keys(scanSetting).map((u, i) => {
            if (u == "profile") {
              console.log(scanSetting[u])
              let str = u.replace(/^./, u[0].toUpperCase())
              return (
                <Col key={`${u.name}-${i}`} sm={12} xs={24}>
                  <Form.Item
                    key={u}
                    label={str}
                    name={u}>
                    <Select
                      id={u}
                      placeholder={profileId}
                      defaultValue={profileId}
                      onChange={(value) => {
                        dispatch(scanSetSaving({ 'profile': value }))

                      }}
                    >
                      {scanSetting[u].map(num => {
                        return (
                          <Option value={num}>{num}</Option>
                        )
                      })}

                    </Select>
                  </Form.Item>
                </Col>
              )
            }

            else {
              let str = u.replace(/^./, u[0].toUpperCase())

              return (
                <Col key={`${u.name}-${i}`} sm={12} xs={24}>
                  <Form.Item
                    key={u}
                    label={str}
                    name={u}>
                    <Input
                      id={u}
                      defaultValue={scanDataSource[u]}
                      placeholder={scanDataSource[u]}
                      onPressEnter={saveSetting}
                    />
                  </Form.Item>
                </Col>
              )

            }
          })
        }
      </>)
  }

  return (

    <>
      <PageHeader
        ghost
        title={`Scan`}
        buttons={[
          <div key="1" className="page-header-actions">
            <Button className="btn-add_new" size="default" type="primary" onClick={toggleMailComposer}>
              + Upload
            </Button>
          </div>
        ]}
      />
      <Modal
        type={`primary`}
        centered
        footer={null}
        visible={isMailEditorOpen.editor}
        onCancel={closeMailComposr}
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
              <Form name="info" layout="vertical" >
                <Row gutter={16}>
                  <SettingList />
                </Row>
              </Form>
            </TabPane>
          </Tabs>
        </Spin>
      </Modal >

      <Main>
        {tableInfo == '' ?
          <></> :
          <>
            <Row gutter={25}>
              {
                tableInfo.response.map((res, id) => {
                  console.log(res)
                  let startIdx = (pageinfo.current - 1) * pageinfo.pageSize
                  let endIdx = startIdx + pageinfo.pageSize
                  if (id >= startIdx && id < endIdx)
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
                            <NavLink to={{
                              pathname: "/admin/detail/result",
                              state: {
                                from: 'scan',
                                data: tableInfo.response,
                                index: id
                              }
                            }} >
                              <figure>
                                <div style={{
                                  height: "250px",
                                  margin: "auto",
                                  borderRadius: "5px",
                                  backgroundImage: `url(${res.outputImage['front']})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                  backgroundAttachment: "local",
                                  backgroundRepeat: "no-repeat"
                                }}>
                                </div>
                                <figcaption>
                                  <div className="gallery-single-content">
                                    <Heading className="gallery-single-title" as="h4">
                                      {res.name}
                                    </Heading>
                                    <div>
                                      <p>
                                        Decision:
                                        <span style={{ color: '#000' }}>{res.result.decision}</span>
                                        &emsp;
                                        State:
                                        <span style={{ color: '#000' }}>{res.result.data.countryFull !== undefined ? res.result.data.countryFull[0].value : 'Unknown'}</span>
                                        &emsp;
                                      </p>
                                      <p>Transaction ID: </p>
                                      <span>
                                        {res.result.transactionId}
                                        <p style={{ textAlign: "right" }}>{res.scanTime}</p>
                                      </span>
                                    </div>
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
            <Row>
              {tableInfo.response.length > 2 ?
                <Col className="pb-30" >
                  <Pagination
                    onChange={changePage}
                    pageSize={pageinfo.pageSize}
                    total={tableInfo.response.length}
                  >
                  </Pagination>
                </Col>
                :
                <></>
              }
            </Row>
          </>

        }
      </Main>
    </>
  );
};

Email.propTypes = {
  match: propTypes.object,
};

export default Email;
