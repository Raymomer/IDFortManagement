import React, { useState } from 'react';
import axios from "../../components/axios";
import { Row, Col, Form, Input, Select, Switch, Collapse, InputNumber } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Popover } from '../../components/popup/popup';
import { Button } from '../../components/buttons/buttons';
import { Slider } from '../../components/slider/slider';
import BannerCard from '../../components/cards/BannerCard';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { HorizontalForm } from '../forms/overview/HorizontalForm';
import { HorizontalFormStyleWrap } from '../forms/overview/Style';
import { CardStyleWrapper } from '../../container/ui-elements/ui-elements-styled';

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;
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

// const getUserData = () => {
//     return new Promise((resolve, reject) => {
//       axios.get('https://mocki.io/v1/b56899dd-8da2-4e4b-b033-7e3d24498ff4')
//           .then(res => resolve(res.data))
//           .catch(err => reject(err));
//     });
//   }

// let temp;
// getUserData().then(function(value) {
//   temp = value;
// }); 

// b56899dd-8da2-4e4b-b033-7e3d24498ff4


const BlankPage = () => {

  // const [data, setData] = useState(temp);
  // console.log("After2=>", data);
  // const [state, setState] = useState(data);
  
  //getProfile
  const [state, setState] = useState({
    canvasSize: 1800,
    orientationCorrection: true,
    saveResult: true,
    saveImage: true,
    outputImage: true,
    outputType: "base64",
    crop: true,
    outputSize: 800,
    obscure: ["documentNumber","face","hairColor","eyeColor"],
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
    },
    decisions:{
      UNRECOGNIZED_DOCUMENT: { 
        enabled: false,
        review: -1, 
        reject: 0.5,
        weight: 1 
      },
      UNRECOGNIZED_BACK_DOCUMENT: { 
        enabled: true,
        review: -1, 
        reject: 0,
        weight: 1 
      },
      UNRECOGNIZED_BACK_BARCODE: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      INVALID_BACK_DOCUMENT: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      SELFIE_FACE_NOT_FOUND: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      SELFIE_MULTIPLE_FACES: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      DOCUMENT_FACE_NOT_FOUND:  {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      DOCUMENT_FACE_LANDMARK_ERR: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      SELFIE_FACE_LANDMARK_ERR: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      INTERNAL_FACE_VERIFICATION_ERR: {
        enabled: true,
        review: 0, 
        reject: -1,
        weight: 1
      },
      FACE_MISMATCH: { 
        enabled: true,
        review: 0.45, 
        reject: 0.5, 
        weight: 1
      },
      FACE_IDENTICAL: {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      DOCUMENT_COUNTRY_MISMATCH: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      DOCUMENT_STATE_MISMATCH: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      DOCUMENT_NAME_MISMATCH: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      DOCUMENT_DOB_MISMATCH: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      MISSING_EXPIRY_DATE: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      MISSING_ISSUE_DATE: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      MISSING_BIRTH_DATE: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      MISSING_DOCUMENT_NUMBER: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      MISSING_PERSONAL_NUMBER: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      MISSING_ADDRESS: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      MISSING_POSTCODE:  {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      MISSING_NAME: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      MISSING_LOCAL_NAME: {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      MISSING_GENDER: {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      MISSING_HEIGHT: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      MISSING_WEIGHT: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      MISSING_HAIR_COLOR: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      MISSING_EYE_COLOR: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      MISSING_RESTRICTIONS: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      MISSING_VEHICLE_CLASS: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      MISSING_ENDORSEMENT: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      UNDER_18:  {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      UNDER_19: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      UNDER_20: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      UNDER_21:  {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      DOCUMENT_EXPIRED: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      NAME_VERIFICATION_FAILED: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      DOB_VERIFICATION_FAILED: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      AGE_VERIFICATION_FAILED: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      ID_NUMBER_VERIFICATION_FAILED: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      ADDRESS_VERIFICATION_FAILED: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      POSTCODE_VERIFICATION_FAILED:  {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      TYPE_NOT_ACCEPTED: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      COUNTRY_NOT_ACCEPTED: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      STATE_NOT_ACCEPTED:     {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      RECAPTURED_DOCUMENT:  {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      SCREEN_DETECTED:  {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      IMAGE_FORGERY_DETECTED: {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      FEATURE_VERIFICATION_FAILED: {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      IMAGE_EDITED: {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      AML_SANCTION: {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      AML_CRIME: {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      AML_PEP: {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      LOW_TEXT_CONFIDENCE: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      FAKE_ID_DETECTED: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      ARTIFICIAL_IMAGE: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      ARTIFICIAL_TEXT: {
        enabled: true,
        review: -1,
        reject: 0,
        weight: 1
      },
      TEXT_FORGERY_DETECTED: {
        enabled: true,
        review: 0,
        reject: -1,
        weight: 1
      },
      IP_COUNTRY_MISMATCH: {
        enabled: true,
        review: -1,
        reject: -1,
        weight: 1
      },
      UNKNOWN: {
        enabled: true,
        review: -1,
        reject: -1
      }
    }
  });


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
    thresholds:[
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
    decisionTrigger:[
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
    decisions:[
      {
        "id": 1,
        "name": "UNRECOGNIZED_DOCUMENT",
        "label": "Unrecognized Document",
        "tooltip": "",
      },
      {
        "id": 2,
        "name": "UNRECOGNIZED_BACK_DOCUMENT",
        "label": "Unrecognized Back Document",
        "tooltip": "",
      },
      {
        "id": 3,
        "name": "UNRECOGNIZED_BACK_BARCODE",
        "label": "Unrecognized Back Barcode",
        "tooltip": "",
      },
      {
        "id": 4,
        "name": "INVALID_BACK_DOCUMENT",
        "label": "Invalid Back Document",
        "tooltip": "",
      },
      {
        "id": 5,
        "name": "SELFIE_FACE_NOT_FOUND",
        "label": "Selfie Face Not Found",
        "tooltip": "",
      },
      {
        "id": 6,
        "name": "SELFIE_MULTIPLE_FACES",
        "label": "Selfie multiple Faces",
        "tooltip": "",
      },
      {
        "id": 7,
        "name": "DOCUMENT_FACE_NOT_FOUND",
        "label": "Document Face Not Found",
        "tooltip": "",
      },
      {
        "id": 8,
        "name": "DOCUMENT_FACE_LANDMARK_ERR",
        "label": "Document Face Landmark Error",
        "tooltip": "",
      },
      {
        "id": 9,
        "name": "SELFIE_FACE_LANDMARK_ERR",
        "label": "Selfie Face Landmark Error",
        "tooltip": "",
      },
      {
        "id": 10,
        "name": "INTERNAL_FACE_VERIFICATION_ERR",
        "label": "Internal Face Verification Error",
        "tooltip": "",
      },
      {
        "id": 11,
        "name": "FACE_MISMATCH",
        "label": "Face Mismatch",
        "tooltip": "",
      },
      {
        "id": 12,
        "name": "FACE_IDENTICAL",
        "label": "Face Identical",
        "tooltip": "",
      },
      {
        "id": 13,
        "name": "DOCUMENT_COUNTRY_MISMATCH",
        "label": "Document Country Mismatch",
        "tooltip": "",
      },
      {
        "id": 14,
        "name": "DOCUMENT_STATE_MISMATCH",
        "label": "Document State Mismatch",
        "tooltip": "",
      },
      {
        "id": 15,
        "name": "DOCUMENT_NAME_MISMATCH",
        "label": "Document Name Mismatch",
        "tooltip": "",
      },
      {
        "id": 16,
        "name": "DOCUMENT_DOB_MISMATCH",
        "label": "Document DOB Mismatch",
        "tooltip": "",
      },
      {
        "id": 17,
        "name": "MISSING_EXPIRY_DATE",
        "label": "Missing Expiry Date",
        "tooltip": "",
      },
      {
        "id": 18,
        "name": "MISSING_ISSUE_DATE",
        "label": "Missing Issue Date",
        "tooltip": "",
      },
      {
        "id": 19,
        "name": "MISSING_BIRTH_DATE",
        "label": "Missing Birth Date",
        "tooltip": "",
      },
      {
        "id": 20,
        "name": "MISSING_DOCUMENT_NUMBER",
        "label": "Missing Document number",
        "tooltip": "",
      },
      {
        "id": 21,
        "name": "MISSING_PERSONAL_NUMBER",
        "label": "Missing Personal Number",
        "tooltip": "",
      },
      {
        "id": 22,
        "name": "MISSING_ADDRESS",
        "label": "Missing Address",
        "tooltip": "",
      },
      {
        "id": 23,
        "name": "MISSING_POSTCODE",
        "label": "Missing Postcode",
        "tooltip": "",
      },
      {
        "id": 24,
        "name": "MISSING_NAME",
        "label": "Missing Name",
        "tooltip": "",
      },
      {
        "id": 25,
        "name": "MISSING_LOCAL_NAME",
        "label": "Missing Local Name",
        "tooltip": "",
      },
      {
        "id": 26,
        "name": "MISSING_GENDER",
        "label": "Missing Gender",
        "tooltip": "",
      },
      {
        "id": 27,
        "name": "MISSING_HEIGHT",
        "label": "Missing Height",
        "tooltip": "",
      },
      {
        "id": 28,
        "name": "MISSING_WEIGHT",
        "label": "Missing Weight",
        "tooltip": "",
      },
      {
        "id": 29,
        "name": "MISSING_HAIR_COLOR",
        "label": "Missing Hair Color",
        "tooltip": "",
      },
      {
        "id": 30,
        "name": "MISSING_EYE_COLOR",
        "label": "Missing Eye Color",
        "tooltip": "",
      },
      {
        "id": 31,
        "name": "MISSING_RESTRICTIONS",
        "label": "Missing Restrictions",
        "tooltip": "",
      },
      {
        "id": 32,
        "name": "MISSING_VEHICLE_CLASS",
        "label": "Missing Vehicle Class",
        "tooltip": "",
      },
      {
        "id": 33,
        "name": "MISSING_ENDORSEMENT",
        "label": "Missing Endorsement",
        "tooltip": "",
      },
      {
        "id": 34,
        "name": "UNDER_18",
        "label": "Under 18",
        "tooltip": "",
      },
      {
        "id": 35,
        "name": "UNDER_19",
        "label": "Under 19",
        "tooltip": "",
      },
      {
        "id": 36,
        "name": "UNDER_20",
        "label": "Under 20",
        "tooltip": "",
      },
      {
        "id": 37,
        "name": "UNDER_21",
        "label": "Under 21",
        "tooltip": "",
      },
      {
        "id": 38,
        "name": "DOCUMENT_EXPIRED",
        "label": "Document Expired",
        "tooltip": "",
      },
      {
        "id": 39,
        "name": "NAME_VERIFICATION_FAILED",
        "label": "Name Verification Failed",
        "tooltip": "",
      },
      {
        "id": 40,
        "name": "DOB_VERIFICATION_FAILED",
        "label": "DOB Verification Failed",
        "tooltip": "",
      },
      {
        "id": 41,
        "name": "AGE_VERIFICATION_FAILED",
        "label": "Age Verification Failed",
        "tooltip": "",
      },
      {
        "id": 42,
        "name": "ID_NUMBER_VERIFICATION_FAILED",
        "label": "ID Number Verification Failed",
        "tooltip": "",
      },
      {
        "id": 43,
        "name": "ADDRESS_VERIFICATION_FAILED",
        "label": "Address Verification Failed",
        "tooltip": "",
      },
      {
        "id": 44,
        "name": "POSTCODE_VERIFICATION_FAILED",
        "label": "Postcode Verification Failed",
        "tooltip": "",
      },
      {
        "id": 45,
        "name": "TYPE_NOT_ACCEPTED",
        "label": "Type Not Accepted",
        "tooltip": "",
      },
      {
        "id": 46,
        "name": "COUNTRY_NOT_ACCEPTED",
        "label": "Country Not Accepted",
        "tooltip": "",
      },
      {
        "id": 47,
        "name": "STATE_NOT_ACCEPTED",
        "label": "State Not Accepted",
        "tooltip": "",
      },
      {
        "id": 48,
        "name": "RECAPTURED_DOCUMENT",
        "label": "Recaptured Document",
        "tooltip": "",
      },
      {
        "id": 49,
        "name": "SCREEN_DETECTED",
        "label": "Screen Detected",
        "tooltip": "",
      },
      {
        "id": 50,
        "name": "IMAGE_FORGERY_DETECTED",
        "label": "Image Forgery Detected",
        "tooltip": "",
      },
      {
        "id": 51,
        "name": "FEATURE_VERIFICATION_FAILED",
        "label": "Feature Verification Failed",
        "tooltip": "",
      },
      {
        "id": 52,
        "name": "IMAGE_EDITED",
        "label": "Image Edited",
        "tooltip": "",
      },
      {
        "id": 53,
        "name": "AML_SANCTION",
        "label": "AML Sanction",
        "tooltip": "",
      },
      {
        "id": 54,
        "name": "AML_CRIME",
        "label": "AML Crime",
        "tooltip": "",
      },
      {
        "id": 55,
        "name": "AML_PEP",
        "label": "AML PEP",
        "tooltip": "",
      },
      {
        "id": 56,
        "name": "LOW_TEXT_CONFIDENCE",
        "label": "Low Text Confidence",
        "tooltip": "",
      },
      {
        "id": 57,
        "name": "FAKE_ID_DETECTED",
        "label": "Fake ID Detected",
        "tooltip": "",
      },
      {
        "id": 58,
        "name": "ARTIFICIAL_IMAGE",
        "label": "Artificial Image",
        "tooltip": "",
      },
      {
        "id": 59,
        "name": "ARTIFICIAL_TEXT",
        "label": "Artificial Text",
        "tooltip": "",
      },
      {
        "id": 60,
        "name": "TEXT_FORGERY_DETECTED",
        "label": "Text Forgery Detected",
        "tooltip": "",
      },
      {
        "id": 61,
        "name": "IP_COUNTRY_MISMATCH",
        "label": "IP Country Mismatch",
        "tooltip": "",
      },
      {
        "id": 62,
        "name": "UNKNOWN",
        "label": "Unknown",
        "tooltip": "",
      }
    ]
  };

  const OPTIONS = ['documentNumber', 'face', 'hairColor', 'eyeColor', 'dob', 'address1', 'address2'];
  const filteredOptions = OPTIONS.filter(o => !state.obscure.includes(o));

  const onChange = name => value => {
    console.log("Before=>", name, state[name]);
    console.log(value);
    setState({ 
      ...state, 
      [name]: value 
    });
  };

  // const handleOpen = name => value => {
  //   console.log("Before=>", name, state.decisions[name].enabled);
  //   console.log(value);
  //   // const lists = [...state.decisions];
  //   // console.log(lists);
  //   setState({ 
  //     ...state.decisions["UNRECOGNIZED_DOCUMENT"], 
  //     enabled: value
  //   });
  // };


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
                  item['basic'].map((u,i) => {
                    return(
                      (u.type == "input")?
                      <Form.Item label={u.label} name={u.name} initialValue={state[u.name]} tooltip={u.tooltip}>
                        <Input placeholder={u.placeholder} />
                      </Form.Item>
                      :
                      (u.type == "pick")?
                      <Form.Item label={u.label} name={u.name} initialValue={state[u.name]} tooltip={u.tooltip}>
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="base64">Base 64</Option>
                          <Option value="url">URL</Option>
                        </Select>
                      </Form.Item>:
                      (u.type == "multi-pick")?
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
                      </Form.Item>:
                      (u.type == "switch")?
                        <Form.Item label={u.label} name={u.name} tooltip={u.tooltip}>
                          <Switch autoFocus size="large" defaultChecked={state[u.name]} onChange={onChange(u.name)} />
                        </Form.Item>
                    :null
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
                    item['decisionTrigger'].map((u,i) => {
                      return(
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
                    item['thresholds'].map((u,i) => {
                      return(
                        <Form.Item name={u.name}>
                          <h3>{u.label}</h3>
                          <Slider marks={marks} defaultValue={state.thresholds[u.name]} min={0} max={1} step={0.1}/>
                        </Form.Item>
                        )
                      })
                  }
                </Cards>
              </Col>
              <Col md={24} sm={24} xs={24}>
                 <Cards title="Decisions">
                 <Row gutter="25">
                  {
                    item['decisions'].map((u,i) => {
                      return(
                        <Col xxl={8} md={12} className="mb-25">
                          <CardStyleWrapper>
                            <Cards headless border size="default" key={i}>
                                <Form.Item label={u.label} name={u.name}>
                                  <Switch autoFocus size="large" defaultChecked={state.decisions[u.name].enabled} />
                                </Form.Item>
                                <Row gutter={30}>
                                  <Col sm={8} xs={24} className="mb-25">
                                    <Form.Item label="Review" name="review" initialValue={state.decisions[u.name].review}>
                                      <InputNumber style={{ width: '100%' }}  min={-1} max={1} step={0.01}/>
                                    </Form.Item>
                                  </Col>
                                  <Col sm={8} xs={24} className="mb-25">
                                    <Form.Item label="Reject" name="reject">
                                      <InputNumber style={{ width: '100%' }} defaultValue={state.decisions[u.name].reject} min={-1} max={1} step={0.01}/>
                                    </Form.Item>
                                  </Col>
                                  <Col sm={8} xs={24} className="mb-25">
                                    <Form.Item label="Weight" name="weight">
                                      <InputNumber style={{ width: '100%' }} defaultValue={state.decisions[u.name].weight} min={0} max={1} step={0.01}/>
                                    </Form.Item>
                                  </Col>
                                </Row>
                            </Cards>
                          </CardStyleWrapper>
                        </Col>
                        )
                      })
                  }
                   
                  </Row>
                </Cards>
              </Col>
            </Row>
          </Form>
  
      </Main>
    </>
  );
};

export default BlankPage;
