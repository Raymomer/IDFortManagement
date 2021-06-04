import React, { useState } from 'react';
import { Row, Col, Form, Collapse, Table, Select, Progress, Carousel, Tooltip, message } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { BasicFormWrapper, Main } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { ShowResponse, TestimonialStyleWrapper } from '../style';
import { Modal } from '../../../components/modals/antd-modals';
import { Cards } from '../../../components/cards/frame/cards-frame';


import DEFAULT from '../../../demoData/default.json'



import SwiperCore, { Navigation, Pagination } from 'swiper';
import axios from 'axios'
import FileSaver, { saveAs } from 'file-saver'

import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss';
import { FormProvider } from 'antd/lib/form/context';
import { object } from 'prop-types';


SwiperCore.use([Navigation, Pagination]);
const paramsThree = {
  slidesPerView: 1,
  loop: true,
  navigation: {

  },
};



const { Option } = Select;
const supported_fields = ["documentNumber", "personalNumber", "firstName", "middleName", "lastName", "fullName", "firstName_local", "middleName_local", "lastName_local", "fullName_local", "dob", "expiry", "issued", "sex", "height", "weight", "address1", "address2", "postcode", "placeOfBirth", "documentType", "documentName", "vehicleClass", "restrictions", "issueAuthority", "issuerOrg_region_full", "issuerOrg_region_abbr", "issuerOrg_iso2", "nationality_iso2", "optionalData", "optionalData2", "customdata1", "customdata2", "customdata3", "customdata4", "customdata5", "trustlevel", "trustnote", "docupass_reference", "image", "imagehash", "documentNumber_formatted", "updatetime", "createtime"];


const { Panel } = Collapse;

const Info = () => {



  const getDataSource = () => {
    console.log("getDataSource")
    console.log(state)

    let source = []
    Object.keys(state.result.data).map(parameters => {
      state.result.data[parameters].filter(i => i.index == 0).map(res => {
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

    return source

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




  const insertlabel = (idx) => {
    let insert = []
    Object.keys(state["result"]["data"]).forEach(rowlabel => {

      state["result"]["data"][rowlabel].filter(res => res.index == idx && res.outputBox != undefined).map((res, i) => {
        let draw = res.outputBox
        let x = draw[0][0] / 2
        let y = draw[0][1] / 2
        let w = (draw[1][0] - draw[0][0]) / 2
        let h = (draw[3][1] - draw[0][1]) / 2
        console.log(rowlabel, ": ", res.value)
        console.log(x, y, w, h)
        insert.push(
          <Tooltip title={rowlabel + ": " + res.value} >
            <label style={{
              position: "absolute",
              left: x,
              top: y,
              width: w,
              height: h

            }}
              key={i}
            >

            </label>
          </Tooltip>)
      })

    })
    return insert

  }

  const ImageList = ({ index, name }) => {
    const insert = insertlabel(index)

    return (
      <div style={{ position: "relative" }}>


        <img style={{ width: "500px" }} src={`data:image/png;base64,` + state.documentImage[name]} alt="" />

        {
          insert.map(ele => {
            return ele
          })
        }

      </div>
    )
  }

  const [photoes, setPhotoes] = useState({
    index: 0,
    dotPosition: 'top',
    changeValues: [],
  });

  const [coll, setColl] = useState({
    key: 0,
  });
  const callback = key => {
    setColl({ ...coll, key });
  };

  const onChange = (a, b, c) => {
    setPhotoes({ ...photoes, changeValues: [a, b, c] });
  };


  const imageCarousel = () => {

    console.log(state.documentImage)
    return (
      <div>
        <img style={{ width: "500px" }} src={`data:image/png;base64,` + state.documentImage.front} alt="" />
      </div>
    )


  }



  const [state, setState] = useState({
    values: '',
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    url: null,
    update: {},
    result: {},
    documentImage: {},
  });


  const [form] = Form.useForm();

  const handleSubmit = values => {
    setState({ ...state, values });
  };

  const showModal = (response) => {


    setState({
      ...state,
      visible: true,
      result: response,
      documentImage: response.outputImage
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

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const onHandleChange = info => {
    console.log("onHandleChange")
    if (info.file.status === 'uploading') {
      console.log(info.fileList)
      setState({ ...state, loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setState({
          imageUrl,
          loading: false,
        }),

      );
    }
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const scan = async () => {


    let r = {}
    let base64arr

    if (document.querySelector('#document').files.length > 0) {
      let base64str = await toBase64(document.querySelector('#document').files[0])
      base64arr = base64str.split("base64,")
      r["document"] = base64arr[1]
    }
    if (document.querySelector('#documentBack').files.length > 0) {
      let base64str = await toBase64(document.querySelector('#documentBack').files[0])
      base64arr = base64str.split("base64,")
      r["documentBack"] = base64arr[1]
    }

    r["profileRaw"] = DEFAULT

    let url = "http://192.168.0.104/"
    axios.post(url, r, {
      headers: {
        Authorization: "Apikey floES9vvi4CPOXpADR3c5zvIy2UGksrx",
      }
    }).then(function (res) {
      let response = res.data


      console.log(response)

      Object.keys(response.data).map(parameters => {

        if (!supported_fields.includes(parameters)) {
          delete response.data[parameters]
        }

      })

      console.log(Object.keys(response.data))
      showModal(response)

    }).catch(function (error) {

      console.log(error)
    });
  }

  const TableList = () => {

    const responseDataSource = getDataSource()

    return (

      <Table className="table-responsive" pagination={false} dataSource={responseDataSource} columns={docColums} showHeader={false} />

    )
  }







  return (
    <Row justify="center">
      <Col xl={10} md={16} xs={24}>
        <div className="user-info-form">
          <BasicFormWrapper>
            <Form style={{ width: '100%', position: "inherit", }} form={form} name="info" colon={false} onFinish={handleSubmit}>

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


              <Form.Item>
                <div className="add-user-bottom text-left">
                  <Button
                    className="ant-btn ant-btn-light"
                    onClick={() => {
                      return form.resetFields();
                    }}
                  >
                    Reset
                  </Button>
                  <Button onClick={scan} htmlType="submit" type="primary">
                    <Link to="#">Scan</Link>
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
                {/* 
                <Form.Item name="Status" label="Status">

                  <Progress percent={"95"} strokeWidth={5} className="progress-primary" />

                </Form.Item> */}

                <Form.Item label={<p>Document Image</p>} name="name">

                  <div
                    className="testimonial-block theme-4"
                    style={{
                      "backgroundColor": "#fff",
                    }}>

                    <Carousel afterChange={onChange}
                      adaptiveHeight={true}
                      dotPosition={'bottom'}

                    >
                      {
                        Object.keys(state.documentImage).map((i, idx) => {
                          return (
                            <div>
                              <ImageList index={idx} name={i} />
                            </div>
                          )

                        })
                      }

                    </Carousel>

                  </div>



                </Form.Item>
                <Collapse defaultActiveKey={['1']} onChange={callback}>
                  <Panel header="Scan Result" key="1">
                    <TableList />
                  </Panel>

                  <Panel header="Error" key="2">
                    <TableList />
                  </Panel>
                </Collapse>


              </Form>
            </BasicFormWrapper>
          </ShowResponse>
        </div>
      </Modal >

    </Row >
  );
};

export default Info;
