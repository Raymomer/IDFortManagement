import React, { useState, useEffect } from 'react';
// import axios from "../../components/axios";
import { Row, Col, Form, Input, Select, Switch, Table, Tooltip, InputNumber, Checkbox } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Popover } from '../../components/popup/popup';
import { Button } from '../../components/buttons/buttons';
import { Slider } from '../../components/slider/slider';


import DEFAULT from '../../demoData/default.json'

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
  "-1": {
    style: {
      color: '#f50',
    },
    label: <strong>-1</strong>
  },
  0: '0',
  0.5: '0.5',
  1: '1'
};





const BlankPage = () => {

  const [state, setState] = useState({
    canvasSize: 1800,
    orientationCorrection: true,
    saveResult: true,
    saveImage: true,
    outputImage: true,
    outputType: "base64",
    crop: true,
    outputSize: 800,
    obscure: ["documentNumber", "face", "hairColor", "eyeColor"],
    thresholds: {
      face: 0.5,
      nameDualSide: 0.5,
      nameVerification: 0.7,
      addressVerification: 0.9,
      imageForgery: 0.5,
      textForgery: 0.5,
      recapture: 0.5,
      screenDetection: 0.4,
      lowTextConfidence: 0.3,
      artificialImage: 0.5,
      artificialText: 0.5,
      faceIdentical: 0.5
    },
    decisionTrigger: {
      review: 1,
      reject: 1
    }
  });

  const [decisions, setDecisions] = useState(DEFAULT.decisions);

  const item = {
    basic: [
      {
        "type": "input",
        "name": "canvasSize",
        "label": "Canvas Size",
        "tooltip": "Reduce uploaded image size before sending sending it to OCR/Barcode engine.",
        "placeholder": "Canvas Size"
      },
      {
        "type": "switch",
        "name": "orientationCorrection",
        "label": "Orientation Correction",
        "tooltip": ""
      },
      {
        "type": "switch",
        "name": "saveResult",
        "label": "Save Result",
        "tooltip": "Save document information in your local database."
      },
      {
        "type": "switch",
        "name": "saveImage",
        "label": "Save Image",
        "tooltip": "Save document image in your local database."
      },
      {
        "type": "switch",
        "name": "outputImage",
        "label": "Output Image",
        "tooltip": "Produce a cropped image of the document."
      },
      {
        "type": "pick",
        "name": "outputType",
        "label": "Output Type",
        "tooltip": "Output the cropped document and face as either URL or base64-encoded content.",
        "placeholder": "Output Type"
      },
      {
        "type": "switch",
        "name": "crop",
        "label": "Crop",
        "tooltip": "A base64-encoded image (or an array of base64-encoded images for dualside scan) of cropped document in JPEG format."
      },
      {
        "type": "input",
        "name": "outputSize",
        "label": "Output Size",
        "tooltip": "The size of the cropped image or saved document.",
        "placeholder": "Output Size"
      },
      {
        "type": "multi-pick",
        "name": "obscure",
        "label": "Obscure",
        "tooltip": "The information in the array will not be stored but will be pixelated",
        "placeholder": "Obscure"
      },
    ],
    thresholds: [
      {
        "name": "face",
        "label": "Face",
        "tooltip": "",
      },
      {
        "name": "nameDualSide",
        "label": "Name Dual Side",
        "tooltip": "",
      },
      {
        "name": "nameVerification",
        "label": "Name Verification",
        "tooltip": "",
      },
      {
        "name": "addressVerification",
        "label": "Address Verification",
        "tooltip": "",
      },
      {
        "name": "imageForgery",
        "label": "Image Forgery",
        "tooltip": "",
      },
      {
        "name": "textForgery",
        "label": "Text Forgery",
        "tooltip": "",
      },
      {
        "name": "recapture",
        "label": "Recapture",
        "tooltip": "",
      },
      {
        "name": "screenDetection",
        "label": "Screen Detection",
        "tooltip": "",
      },
      {
        "name": "lowTextConfidence",
        "label": "Low Text Confidence",
        "tooltip": "",
      },
      {
        "name": "artificialImage",
        "label": "Artificial Image",
        "tooltip": "",
      },
      {
        "name": "artificialText",
        "label": "Artificial Text",
        "tooltip": "",
      },
      {
        "name": "faceIdentical",
        "label": "Face Identical",
        "tooltip": "",
      }
    ],
    decisionTrigger: [
      {
        "type": "input",
        "name": "review",
        "label": "Review",
        "tooltip": "",
        "placeholder": "Review"
      },
      {
        "type": "input",
        "name": "reject",
        "label": "Reject",
        "tooltip": "",
        "placeholder": "Reject"
      }
    ],
    decisions: [
      {
        "key": 1,
        "name": "UNRECOGNIZED_DOCUMENT",
        "label": "Unrecognized Document",
        "tooltip": "test",
      },
      {
        "key": 2,
        "name": "UNRECOGNIZED_BACK_DOCUMENT",
        "label": "Unrecognized Back Document",
        "tooltip": "test",
      },
      {
        "key": 3,
        "name": "UNRECOGNIZED_BACK_BARCODE",
        "label": "Unrecognized Back Barcode",
        "tooltip": "",
      },
      {
        "key": 4,
        "name": "INVALID_BACK_DOCUMENT",
        "label": "Invalid Back Document",
        "tooltip": "",
      },
      {
        "key": 5,
        "name": "SELFIE_FACE_NOT_FOUND",
        "label": "Selfie Face Not Found",
        "tooltip": "",
      },
      {
        "key": 6,
        "name": "SELFIE_MULTIPLE_FACES",
        "label": "Selfie multiple Faces",
        "tooltip": "",
      },
      {
        "key": 7,
        "name": "DOCUMENT_FACE_NOT_FOUND",
        "label": "Document Face Not Found",
        "tooltip": "",
      },
      {
        "key": 8,
        "name": "DOCUMENT_FACE_LANDMARK_ERR",
        "label": "Document Face Landmark Error",
        "tooltip": "",
      },
      {
        "key": 9,
        "name": "SELFIE_FACE_LANDMARK_ERR",
        "label": "Selfie Face Landmark Error",
        "tooltip": "",
      },
      {
        "key": 10,
        "name": "INTERNAL_FACE_VERIFICATION_ERR",
        "label": "Internal Face Verification Error",
        "tooltip": "",
      },
      {
        "key": 11,
        "name": "FACE_MISMATCH",
        "label": "Face Mismatch",
        "tooltip": "",
      },
      {
        "key": 12,
        "name": "FACE_IDENTICAL",
        "label": "Face Identical",
        "tooltip": "",
      },
      {
        "key": 13,
        "name": "DOCUMENT_COUNTRY_MISMATCH",
        "label": "Document Country Mismatch",
        "tooltip": "",
      },
      {
        "key": 14,
        "name": "DOCUMENT_STATE_MISMATCH",
        "label": "Document State Mismatch",
        "tooltip": "",
      },
      {
        "key": 15,
        "name": "DOCUMENT_NAME_MISMATCH",
        "label": "Document Name Mismatch",
        "tooltip": "",
      },
      {
        "key": 16,
        "name": "DOCUMENT_DOB_MISMATCH",
        "label": "Document DOB Mismatch",
        "tooltip": "",
      },
      {
        "key": 17,
        "name": "MISSING_EXPIRY_DATE",
        "label": "Missing Expiry Date",
        "tooltip": "",
      },
      {
        "key": 18,
        "name": "MISSING_ISSUE_DATE",
        "label": "Missing Issue Date",
        "tooltip": "",
      },
      {
        "key": 19,
        "name": "MISSING_BIRTH_DATE",
        "label": "Missing Birth Date",
        "tooltip": "",
      },
      {
        "key": 20,
        "name": "MISSING_DOCUMENT_NUMBER",
        "label": "Missing Document number",
        "tooltip": "",
      },
      {
        "key": 21,
        "name": "MISSING_PERSONAL_NUMBER",
        "label": "Missing Personal Number",
        "tooltip": "",
      },
      {
        "key": 22,
        "name": "MISSING_ADDRESS",
        "label": "Missing Address",
        "tooltip": "",
      },
      {
        "key": 23,
        "name": "MISSING_POSTCODE",
        "label": "Missing Postcode",
        "tooltip": "",
      },
      {
        "key": 24,
        "name": "MISSING_NAME",
        "label": "Missing Name",
        "tooltip": "",
      },
      {
        "key": 25,
        "name": "MISSING_LOCAL_NAME",
        "label": "Missing Local Name",
        "tooltip": "",
      },
      {
        "key": 26,
        "name": "MISSING_GENDER",
        "label": "Missing Gender",
        "tooltip": "",
      },
      {
        "key": 27,
        "name": "MISSING_HEIGHT",
        "label": "Missing Height",
        "tooltip": "",
      },
      {
        "key": 28,
        "name": "MISSING_WEIGHT",
        "label": "Missing Weight",
        "tooltip": "",
      },
      {
        "key": 29,
        "name": "MISSING_HAIR_COLOR",
        "label": "Missing Hair Color",
        "tooltip": "",
      },
      {
        "key": 30,
        "name": "MISSING_EYE_COLOR",
        "label": "Missing Eye Color",
        "tooltip": "",
      },
      {
        "key": 31,
        "name": "MISSING_RESTRICTIONS",
        "label": "Missing Restrictions",
        "tooltip": "",
      },
      {
        "key": 32,
        "name": "MISSING_VEHICLE_CLASS",
        "label": "Missing Vehicle Class",
        "tooltip": "",
      },
      {
        "key": 33,
        "name": "MISSING_ENDORSEMENT",
        "label": "Missing Endorsement",
        "tooltip": "",
      },
      {
        "key": 34,
        "name": "UNDER_18",
        "label": "Under 18",
        "tooltip": "",
      },
      {
        "key": 35,
        "name": "UNDER_19",
        "label": "Under 19",
        "tooltip": "",
      },
      {
        "key": 36,
        "name": "UNDER_20",
        "label": "Under 20",
        "tooltip": "",
      },
      {
        "key": 37,
        "name": "UNDER_21",
        "label": "Under 21",
        "tooltip": "",
      },
      {
        "key": 38,
        "name": "DOCUMENT_EXPIRED",
        "label": "Document Expired",
        "tooltip": "",
      },
      {
        "key": 39,
        "name": "NAME_VERIFICATION_FAILED",
        "label": "Name Verification Failed",
        "tooltip": "",
      },
      {
        "key": 40,
        "name": "DOB_VERIFICATION_FAILED",
        "label": "DOB Verification Failed",
        "tooltip": "",
      },
      {
        "key": 41,
        "name": "AGE_VERIFICATION_FAILED",
        "label": "Age Verification Failed",
        "tooltip": "",
      },
      {
        "key": 42,
        "name": "ID_NUMBER_VERIFICATION_FAILED",
        "label": "ID Number Verification Failed",
        "tooltip": "",
      },
      {
        "key": 43,
        "name": "ADDRESS_VERIFICATION_FAILED",
        "label": "Address Verification Failed",
        "tooltip": "",
      },
      {
        "key": 44,
        "name": "POSTCODE_VERIFICATION_FAILED",
        "label": "Postcode Verification Failed",
        "tooltip": "",
      },
      {
        "key": 45,
        "name": "TYPE_NOT_ACCEPTED",
        "label": "Type Not Accepted",
        "tooltip": "",
      },
      {
        "key": 46,
        "name": "COUNTRY_NOT_ACCEPTED",
        "label": "Country Not Accepted",
        "tooltip": "",
      },
      {
        "key": 47,
        "name": "STATE_NOT_ACCEPTED",
        "label": "State Not Accepted",
        "tooltip": "",
      },
      {
        "key": 48,
        "name": "RECAPTURED_DOCUMENT",
        "label": "Recaptured Document",
        "tooltip": "",
      },
      {
        "key": 49,
        "name": "SCREEN_DETECTED",
        "label": "Screen Detected",
        "tooltip": "",
      },
      {
        "key": 50,
        "name": "IMAGE_FORGERY_DETECTED",
        "label": "Image Forgery Detected",
        "tooltip": "",
      },
      {
        "key": 51,
        "name": "FEATURE_VERIFICATION_FAILED",
        "label": "Feature Verification Failed",
        "tooltip": "",
      },
      {
        "key": 52,
        "name": "IMAGE_EDITED",
        "label": "Image Edited",
        "tooltip": "",
      },
      {
        "key": 53,
        "name": "AML_SANCTION",
        "label": "AML Sanction",
        "tooltip": "",
      },
      {
        "key": 54,
        "name": "AML_CRIME",
        "label": "AML Crime",
        "tooltip": "",
      },
      {
        "key": 55,
        "name": "AML_PEP",
        "label": "AML PEP",
        "tooltip": "",
      },
      {
        "key": 56,
        "name": "LOW_TEXT_CONFIDENCE",
        "label": "Low Text Confidence",
        "tooltip": "",
      },
      {
        "key": 57,
        "name": "FAKE_ID_DETECTED",
        "label": "Fake ID Detected",
        "tooltip": "",
      },
      {
        "key": 58,
        "name": "ARTIFICIAL_IMAGE",
        "label": "Artificial Image",
        "tooltip": "",
      },
      {
        "key": 59,
        "name": "ARTIFICIAL_TEXT",
        "label": "Artificial Text",
        "tooltip": "",
      },
      {
        "key": 60,
        "name": "TEXT_FORGERY_DETECTED",
        "label": "Text Forgery Detected",
        "tooltip": "",
      },
      {
        "key": 61,
        "name": "IP_COUNTRY_MISMATCH",
        "label": "IP Country Mismatch",
        "tooltip": "",
      },
      {
        "key": 62,
        "name": "UNKNOWN",
        "label": "Unknown",
        "tooltip": "",
      }
    ]
  };

  const OPTIONS = ['documentNumber', 'face', 'hairColor', 'eyeColor', 'dob', 'address1', 'address2'];
  const filteredOptions = OPTIONS.filter(o => state.obscure ? (!state.obscure.includes(o)) : null);

  const onChange = name => value => {
    console.log("Before=>", name, state[name]);
    console.log(value);
    setState({
      ...state,
      [name]: value
    });
    console.log("After=>", state[name]);
  };

  const sliderChange = (val, obj) => {

  }


  console.log("decisions =>", decisions)

  // table data
  const tableData = [];
  item.decisions.forEach(i => {
    // console.log("decisions => ", decisions[i.name])
    tableData.push({
      key: i.key,
      enabled: (<Checkbox defaultChecked={decisions[i.name].enabled} />),
      name: i.name,
      label: i.label,
      tooltip: i.tooltip,
      review: (<Slider marks={decisionsMark} defaultValue={decisions[i.name].review} min={-1} max={1} step={0.01}
        onChange={(val) => {
          let upgrade = decisions
          // upgrade[i.name]= {...val}
          // upgrade[i.name][review] = val
          upgrade[i.name].review = val
          console.log(upgrade[i.name])
          setDecisions(upgrade)
        }} />),
      reject: (<Slider marks={decisionsMark} defaultValue={decisions[i.name].reject} min={-1} max={1} step={0.01}
        onChange={(val) => {
          let upgrade = decisions
          upgrade[i.name].reject = val
          console.log(upgrade[i.name])
          setDecisions(upgrade)
        }} />),
      weight: (<InputNumber defaultValue={decisions[i.name].weight} min={0} max={1} step={0.01}
        onChange={(val) => {
          let upgrade = decisions
          upgrade[i.name].weight = val
          console.log(upgrade[i.name])
          setDecisions(upgrade)
        }} />)
    })
  });

  // table state
  const [table, setTable] = useState({
    selectedRowKeys: tableData.map(item => item.key),
    selectedRows: tableData.map(item => item),
    values: {},
  });

  // table title
  const columns = [
    {
      title: 'Code',
      dataIndex: 'label',
      key: 'code',
      width: '30%',
      // render: code => (
      //   <Tooltip placement="topLeft" title={item.decisions[item.decisions.map((item) => { return item.label }).indexOf(code)].tooltip}>
      //     {code}
      //   </Tooltip>
      // ),
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

  const { selectedRowKeys } = table;
  const rowSelection = {
    selectedRowKeys, // default checked
    onChange: (res) => {
      // console.log(selectedRowKeys, selectedRows)
      // console.log(table)
      console.log(res)
      // setTable({ ...table, selectedRowKeys, selectedRows });

    },
    getCheckboxProps: record =>
    (

      {
        disabled: record.name === null, // Column configuration not to be checked
        name: record.name,
      }

    )

  };


  return (
    <>
      <PageHeader
        title="Create Profile"
      />
      <Main>
        <Form name="horizontal-form" layout="vertical">
          <Row gutter={25}>
            <Col md={12} sm={12} xs={24}>
              <Cards title="Basic">
                {
                  item['basic'].map((u, i) => {
                    return (
                      (u.type == "input") ?
                        <Form.Item label={u.label} name={u.name} initialValue={state[u.name]} tooltip={u.tooltip}>
                          <Input placeholder={u.placeholder} onChange={onChange(u.name)} />
                        </Form.Item>
                        :
                        (u.type == "pick") ?
                          <Form.Item label={u.label} name={u.name} initialValue={state[u.name]} tooltip={u.tooltip}>
                            <Select size="large" className="sDash_fullwidth-select">
                              <Option value="base64">Base 64</Option>
                              <Option value="url">URL</Option>
                            </Select>
                          </Form.Item> :
                          (u.type == "multi-pick") ?
                            <Form.Item name={u.name} initialValue={state[u.name]} label={u.label} tooltip={u.tooltip}>
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
                            </Form.Item> :
                            (u.type == "switch") ?
                              <Form.Item label={u.label} name={u.name} tooltip={u.tooltip}>
                                <Switch autoFocus size="large" defaultChecked={state[u.name]} onChange={onChange(u.name)} />
                              </Form.Item>
                              : null
                    )
                  })
                }
              </Cards>
              <Cards
                title="Decision Trigger"
                isbutton={(
                  <Popover
                    placement="topRight"
                    content="This score will determine whether it needs to be manually reviewed or rejected in the end.">
                    <FeatherIcon icon="info" size={14} />
                  </Popover>
                )}
              >
                <Row gutter={30}>
                  {
                    item['decisionTrigger'].map((u, i) => {
                      return (
                        <Col sm={12} xs={24} className="mb-25">
                          <Form.Item label={u.label} name={u.name} initialValue={state.decisionTrigger[u.name]} tooltip={u.tooltip}>
                            <Input placeholder={u.placeholder} />
                          </Form.Item>
                        </Col>
                      )
                    })
                  }
                </Row>
              </Cards>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <Cards
                title="Thresholds"
                isbutton={(
                  <Popover
                    placement="topRight"
                    content="The score will be a float between 0 to 1. Strict condition will have a score closer to 1 while loose will have a score closer to 0.">
                    <FeatherIcon icon="info" size={14} />
                  </Popover>
                )}>
                {
                  item['thresholds'].map((u, i) => {
                    return (
                      <Form.Item name={u.name}>
                        <h3>{u.label}</h3>
                        <Slider marks={marks} defaultValue={state.thresholds[u.name]} min={0} max={1} step={0.1} />
                      </Form.Item>
                    )
                  })
                }
              </Cards>
            </Col>
            <Col md={24} sm={24} xs={24}>
              <Cards title="Selection">
                <div>
                  <Table
                    className="table-responsive"
                    dataSource={tableData}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 1500 }}
                  />
                </div>
              </Cards>
            </Col>
          </Row>
        </Form>
      </Main>
    </>
  );
};

export default BlankPage;
