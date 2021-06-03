import React, { useState } from 'react';
import { Row, Col, Form, Input, Upload, Select, Progress, Carousel, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import { ShowResponse, TestimonialStyleWrapper } from '../style';
import { Modal } from '../../../components/modals/antd-modals';
import { Cards } from '../../../components/cards/frame/cards-frame';


import { CarouselStyleWraper } from '../../ui-elements/ui-elements-styled'

import DEFAULT from '../../../demoData/default.json'



import SwiperCore, { Navigation, Pagination } from 'swiper';
import Swiper from 'react-id-swiper';
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




const Info = () => {

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



  console.log(state)
  const { update } = state;
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
    if (document.querySelector('#face').files.length > 0) {
      let base64str = await toBase64(document.querySelector('#face').files[0])
      base64arr = base64str.split("base64,")
      r["face"] = base64arr[1]
    }

    r["profileRaw"] = DEFAULT

    let url = "http://192.168.0.104/"
    axios.post(url, r, {
      headers: {
        Authorization: "Apikey floES9vvi4CPOXpADR3c5zvIy2UGksrx",
      }
    }).then(function (response) {
      let str = JSON.stringify(response.data, null, 2);

      showModal(response.data)

    }).catch(function (error) {

      console.log(error)
    });




  }




  return (
    <Row justify="center">
      <Col xl={10} md={16} xs={24}>
        <div className="user-info-form">
          <BasicFormWrapper>
            <Form style={{ width: '100%', position: "inherit", }} form={form} name="info" onFinish={handleSubmit}>
              <Heading className="form-title" as="h4">
                Upload Single Document
              </Heading>

              <Form.Item name="image" label="Front Image">
                <figure className="photo-upload align-center-v"
                  style={{
                    position: "inherit",
                  }}>
                  <input type="file" id="document" className="form-control"></input>
                </figure>
              </Form.Item>

              <Form.Item name="image" label="Back Image">
                <figure className="photo-upload align-center-v"
                  style={{
                    position: "inherit",
                  }}>
                  <input type="file" id="documentBack" className="form-control"></input>
                </figure>
              </Form.Item>

              <Form.Item name="image" label="Face Image">
                <figure className="photo-upload align-center-v"
                  style={{
                    position: "inherit",
                  }}>
                  <input type="file" id="face" className="form-control"></input>
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
                    <Link to="#">Scan & Result</Link>
                  </Button>
                  <Button onClick={scan} htmlType="submit" type="primary">
                    <Link to="#">Send</Link>
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

                <Form.Item label="Document Image" name="name">
                  <TestimonialStyleWrapper>
                    <div
                      className="testimonial-block theme-4"
                      style={{
                        "backgroundColor": "#fff",
                      }}>

                      {/* <responseImage /> */}
                      <Carousel afterChange={onChange}
                        adaptiveHeight={true}
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


                      {/* <ImageList index={photoes.index} /> */}
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
