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




let response = {
  "success": true,
  "transactionId": "60bdecc7fd476a308d2d675a",
  "data": {
    "age": [
      {
        "value": "36",
        "confidence": 0.981,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            202,
            184
          ],
          [
            317,
            184
          ],
          [
            317,
            201
          ],
          [
            202,
            201
          ]
        ],
        "outputBox": [
          [
            393,
            364
          ],
          [
            617,
            365
          ],
          [
            617,
            398
          ],
          [
            393,
            397
          ]
        ]
      }
    ],
    "countryFull": [
      {
        "value": "Hong Kong",
        "confidence": 1,
        "source": "visual",
        "index": 0
      },
      {
        "value": "United Arab Emirates",
        "confidence": 1,
        "source": "visual",
        "index": 1
      }
    ],
    "countryIso2": [
      {
        "value": "HK",
        "confidence": 1,
        "source": "visual",
        "index": 0
      },
      {
        "value": "AE",
        "confidence": 1,
        "source": "visual",
        "index": 1
      }
    ],
    "countryIso3": [
      {
        "value": "HKG",
        "confidence": 1,
        "source": "visual",
        "index": 0
      },
      {
        "value": "ARE",
        "confidence": 1,
        "source": "visual",
        "index": 1
      }
    ],
    "daysFromIssue": [
      {
        "value": "924",
        "confidence": 0.985,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            203,
            277
          ],
          [
            314,
            277
          ],
          [
            314,
            300
          ],
          [
            203,
            300
          ]
        ],
        "outputBox": [
          [
            396,
            544
          ],
          [
            610,
            545
          ],
          [
            610,
            589
          ],
          [
            396,
            588
          ]
        ]
      }
    ],
    "dob": [
      {
        "value": "1985-06-03",
        "confidence": 0.981,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            202,
            184
          ],
          [
            317,
            184
          ],
          [
            317,
            201
          ],
          [
            202,
            201
          ]
        ],
        "outputBox": [
          [
            393,
            364
          ],
          [
            617,
            365
          ],
          [
            617,
            398
          ],
          [
            393,
            397
          ]
        ]
      }
    ],
    "dobDay": [
      {
        "value": "3",
        "confidence": 0.981,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            202,
            184
          ],
          [
            317,
            184
          ],
          [
            317,
            201
          ],
          [
            202,
            201
          ]
        ],
        "outputBox": [
          [
            393,
            364
          ],
          [
            617,
            365
          ],
          [
            617,
            398
          ],
          [
            393,
            397
          ]
        ]
      }
    ],
    "dobMonth": [
      {
        "value": "6",
        "confidence": 0.981,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            202,
            184
          ],
          [
            317,
            184
          ],
          [
            317,
            201
          ],
          [
            202,
            201
          ]
        ],
        "outputBox": [
          [
            393,
            364
          ],
          [
            617,
            365
          ],
          [
            617,
            398
          ],
          [
            393,
            397
          ]
        ]
      }
    ],
    "dobYear": [
      {
        "value": "1985",
        "confidence": 0.981,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            202,
            184
          ],
          [
            317,
            184
          ],
          [
            317,
            201
          ],
          [
            202,
            201
          ]
        ],
        "outputBox": [
          [
            393,
            364
          ],
          [
            617,
            365
          ],
          [
            617,
            398
          ],
          [
            393,
            397
          ]
        ]
      },
      {
        "value": "1985",
        "confidence": 0.981,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            202,
            184
          ],
          [
            317,
            184
          ],
          [
            317,
            201
          ],
          [
            202,
            201
          ]
        ],
        "outputBox": [
          [
            393,
            364
          ],
          [
            617,
            365
          ],
          [
            617,
            398
          ],
          [
            393,
            397
          ]
        ]
      }
    ],
    "documentNumber": [
      {
        "value": "Z683365(5)",
        "confidence": 0.973,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            350,
            277
          ],
          [
            494,
            276
          ],
          [
            494,
            299
          ],
          [
            349,
            300
          ]
        ],
        "outputBox": [
          [
            679,
            545
          ],
          [
            959,
            545
          ],
          [
            958,
            589
          ],
          [
            677,
            589
          ]
        ]
      }
    ],
    "documentSide": [
      {
        "value": "FRONT",
        "confidence": 1,
        "source": "visual",
        "index": 0
      },
      {
        "value": "FRONT",
        "confidence": 1,
        "source": "visual",
        "index": 1
      }
    ],
    "documentType": [
      {
        "value": "I",
        "confidence": 1,
        "source": "visual",
        "index": 0
      },
      {
        "value": "I",
        "confidence": 1,
        "source": "visual",
        "index": 1
      }
    ],
    "firstName": [
      {
        "value": "Wing Ching",
        "confidence": 0.987,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            88,
            94
          ],
          [
            199,
            94
          ],
          [
            199,
            113
          ],
          [
            88,
            113
          ]
        ],
        "outputBox": [
          [
            170,
            187
          ],
          [
            388,
            188
          ],
          [
            388,
            225
          ],
          [
            170,
            225
          ]
        ]
      },
      {
        "value": "Ma",
        "confidence": 0.996,
        "source": "visual",
        "index": 1,
        "inputBox": [
          [
            103,
            786
          ],
          [
            134,
            786
          ],
          [
            134,
            808
          ],
          [
            103,
            808
          ]
        ],
        "outputBox": [
          [
            116,
            480
          ],
          [
            160,
            480
          ],
          [
            161,
            514
          ],
          [
            116,
            513
          ]
        ]
      }
    ],
    "firstNameLocal": [
      {
        "value": "ما",
        "confidence": 0.87,
        "source": "visual",
        "index": 1,
        "inputBox": [
          [
            419,
            718
          ],
          [
            437,
            718
          ],
          [
            437,
            746
          ],
          [
            419,
            746
          ]
        ],
        "outputBox": [
          [
            574,
            387
          ],
          [
            600,
            388
          ],
          [
            603,
            431
          ],
          [
            576,
            430
          ]
        ]
      }
    ],
    "fullName": [
      {
        "value": "Wing Ching LOK",
        "confidence": 0.9,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            13,
            94
          ],
          [
            199,
            94
          ],
          [
            199,
            113
          ],
          [
            13,
            113
          ]
        ],
        "outputBox": [
          [
            24,
            186
          ],
          [
            388,
            188
          ],
          [
            388,
            225
          ],
          [
            25,
            224
          ]
        ]
      },
      {
        "value": "Ma Elena Esguerra Sarreal",
        "confidence": 0.99,
        "source": "visual",
        "index": 1,
        "inputBox": [
          [
            103,
            783
          ],
          [
            364,
            781
          ],
          [
            364,
            808
          ],
          [
            103,
            808
          ]
        ],
        "outputBox": [
          [
            116,
            475
          ],
          [
            497,
            482
          ],
          [
            499,
            523
          ],
          [
            116,
            513
          ]
        ]
      }
    ],
    "fullNameLocal": [
      {
        "value": "樂永晴",
        "confidence": 0.993,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            29,
            68
          ],
          [
            105,
            68
          ],
          [
            104,
            90
          ],
          [
            29,
            90
          ]
        ],
        "outputBox": [
          [
            54,
            135
          ],
          [
            203,
            135
          ],
          [
            202,
            179
          ],
          [
            55,
            178
          ]
        ]
      }
    ],
    "internalId": [
      {
        "value": "329",
        "confidence": 1,
        "source": "visual",
        "index": 0
      },
      {
        "value": "1712",
        "confidence": 1,
        "source": "visual",
        "index": 1
      }
    ],
    "issued": [
      {
        "value": "2018-11-26",
        "confidence": 0.985,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            203,
            277
          ],
          [
            314,
            277
          ],
          [
            314,
            300
          ],
          [
            203,
            300
          ]
        ],
        "outputBox": [
          [
            396,
            544
          ],
          [
            610,
            545
          ],
          [
            610,
            589
          ],
          [
            396,
            588
          ]
        ]
      }
    ],
    "issuedDay": [
      {
        "value": "26",
        "confidence": 0.985,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            203,
            277
          ],
          [
            314,
            277
          ],
          [
            314,
            300
          ],
          [
            203,
            300
          ]
        ],
        "outputBox": [
          [
            396,
            544
          ],
          [
            610,
            545
          ],
          [
            610,
            589
          ],
          [
            396,
            588
          ]
        ]
      }
    ],
    "issuedMonth": [
      {
        "value": "11",
        "confidence": 0.985,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            203,
            277
          ],
          [
            314,
            277
          ],
          [
            314,
            300
          ],
          [
            203,
            300
          ]
        ],
        "outputBox": [
          [
            396,
            544
          ],
          [
            610,
            545
          ],
          [
            610,
            589
          ],
          [
            396,
            588
          ]
        ]
      },
      {
        "value": "11",
        "confidence": 0.985,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            203,
            277
          ],
          [
            314,
            277
          ],
          [
            314,
            300
          ],
          [
            203,
            300
          ]
        ],
        "outputBox": [
          [
            396,
            544
          ],
          [
            610,
            545
          ],
          [
            610,
            589
          ],
          [
            396,
            588
          ]
        ]
      }
    ],
    "issuedYear": [
      {
        "value": "2018",
        "confidence": 0.985,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            203,
            277
          ],
          [
            314,
            277
          ],
          [
            314,
            300
          ],
          [
            203,
            300
          ]
        ],
        "outputBox": [
          [
            396,
            544
          ],
          [
            610,
            545
          ],
          [
            610,
            589
          ],
          [
            396,
            588
          ]
        ]
      }
    ],
    "lastName": [
      {
        "value": "LOK",
        "confidence": 0.9,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            13,
            94
          ],
          [
            58,
            94
          ],
          [
            58,
            113
          ],
          [
            13,
            113
          ]
        ],
        "outputBox": [
          [
            24,
            186
          ],
          [
            112,
            187
          ],
          [
            112,
            224
          ],
          [
            25,
            224
          ]
        ]
      },
      {
        "value": "Sarreal",
        "confidence": 0.995,
        "source": "visual",
        "index": 1,
        "inputBox": [
          [
            293,
            783
          ],
          [
            364,
            781
          ],
          [
            364,
            803
          ],
          [
            293,
            805
          ]
        ],
        "outputBox": [
          [
            392,
            482
          ],
          [
            497,
            482
          ],
          [
            499,
            516
          ],
          [
            394,
            516
          ]
        ]
      }
    ],
    "lastNameLocal": [
      {
        "value": "ساريال",
        "confidence": 0.933,
        "source": "visual",
        "index": 1,
        "inputBox": [
          [
            208,
            721
          ],
          [
            272,
            721
          ],
          [
            272,
            750
          ],
          [
            208,
            750
          ]
        ],
        "outputBox": [
          [
            266,
            385
          ],
          [
            358,
            387
          ],
          [
            360,
            431
          ],
          [
            266,
            428
          ]
        ]
      }
    ],
    "middleName": [
      {
        "value": "Elena Esguerra",
        "confidence": 0.99,
        "source": "visual",
        "index": 1,
        "inputBox": [
          [
            138,
            785
          ],
          [
            289,
            783
          ],
          [
            289,
            807
          ],
          [
            138,
            808
          ]
        ],
        "outputBox": [
          [
            166,
            479
          ],
          [
            386,
            482
          ],
          [
            388,
            519
          ],
          [
            167,
            514
          ]
        ]
      }
    ],
    "middleNameLocal": [
      {
        "value": "ايلينا اسجویرا",
        "confidence": 0.904,
        "source": "visual",
        "index": 1,
        "inputBox": [
          [
            283,
            718
          ],
          [
            409,
            718
          ],
          [
            409,
            748
          ],
          [
            283,
            748
          ]
        ],
        "outputBox": [
          [
            374,
            382
          ],
          [
            559,
            387
          ],
          [
            561,
            432
          ],
          [
            376,
            428
          ]
        ]
      },
      {
        "value": "ايلينا اسجویرا",
        "confidence": 0.904,
        "source": "visual",
        "index": 1,
        "inputBox": [
          [
            283,
            718
          ],
          [
            409,
            718
          ],
          [
            409,
            748
          ],
          [
            283,
            748
          ]
        ],
        "outputBox": [
          [
            374,
            382
          ],
          [
            559,
            387
          ],
          [
            561,
            432
          ],
          [
            376,
            428
          ]
        ]
      }
    ],
    "nationalityFull": [
      {
        "value": "Hong Kong",
        "confidence": 1,
        "source": "visual",
        "index": 0
      },
      {
        "value": "United Arab Emirates",
        "confidence": 1,
        "source": "visual",
        "index": 1
      },
      {
        "value": "Philippines",
        "confidence": 0.994,
        "source": "visual",
        "index": 1,
        "inputBox": [
          [
            146,
            865
          ],
          [
            259,
            863
          ],
          [
            259,
            886
          ],
          [
            146,
            889
          ]
        ],
        "outputBox": [
          [
            180,
            603
          ],
          [
            346,
            605
          ],
          [
            348,
            641
          ],
          [
            180,
            641
          ]
        ]
      }
    ],
    "nationalityIso2": [
      {
        "value": "HK",
        "confidence": 1,
        "source": "visual",
        "index": 0
      },
      {
        "value": "AE",
        "confidence": 1,
        "source": "visual",
        "index": 1
      }
    ],
    "nationalityIso3": [
      {
        "value": "HKG",
        "confidence": 1,
        "source": "visual",
        "index": 0
      },
      {
        "value": "ARE",
        "confidence": 1,
        "source": "visual",
        "index": 1
      }
    ],
    "optionalData": [
      {
        "value": "*** AZ",
        "confidence": 0.99,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            203,
            208
          ],
          [
            255,
            208
          ],
          [
            254,
            222
          ],
          [
            203,
            222
          ]
        ],
        "outputBox": [
          [
            396,
            411
          ],
          [
            497,
            411
          ],
          [
            494,
            439
          ],
          [
            396,
            437
          ]
        ]
      },
      {
        "value": "784-1988-0920430-2",
        "confidence": 0.982,
        "source": "visual",
        "index": 1,
        "inputBox": [
          [
            291,
            627
          ],
          [
            475,
            625
          ],
          [
            475,
            646
          ],
          [
            291,
            647
          ]
        ],
        "outputBox": [
          [
            380,
            247
          ],
          [
            648,
            249
          ],
          [
            650,
            280
          ],
          [
            382,
            277
          ]
        ]
      }
    ],
    "personalNumber": [
      {
        "value": "2867 3057 2532",
        "confidence": 0.994,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            201,
            119
          ],
          [
            359,
            119
          ],
          [
            359,
            136
          ],
          [
            202,
            137
          ]
        ],
        "outputBox": [
          [
            392,
            237
          ],
          [
            701,
            239
          ],
          [
            701,
            272
          ],
          [
            393,
            273
          ]
        ]
      },
      {
        "value": "784-1988-0920430-2",
        "confidence": 0.982,
        "source": "visual",
        "index": 1,
        "inputBox": [
          [
            291,
            627
          ],
          [
            475,
            625
          ],
          [
            475,
            646
          ],
          [
            291,
            647
          ]
        ],
        "outputBox": [
          [
            380,
            247
          ],
          [
            648,
            249
          ],
          [
            650,
            280
          ],
          [
            382,
            277
          ]
        ]
      }
    ],
    "sex": [
      {
        "value": "F",
        "confidence": 0.994,
        "source": "visual",
        "index": 0,
        "inputBox": [
          [
            354,
            184
          ],
          [
            365,
            184
          ],
          [
            365,
            201
          ],
          [
            353,
            201
          ]
        ],
        "outputBox": [
          [
            689,
            365
          ],
          [
            711,
            365
          ],
          [
            711,
            398
          ],
          [
            687,
            398
          ]
        ]
      }
    ]
  },
  "outputImage": {
    "front": "https://192.168.0.104/image/60bdecc7fd476a308d2d675a/c824c269fab01db97ee0775a1af3b09bced874e3faf851eba140f3b431f2084b/front.jpg",
    "back": "https://192.168.0.104/image/60bdecc7fd476a308d2d675a/c824c269fab01db97ee0775a1af3b09bced874e3faf851eba140f3b431f2084b/back.jpg"
  },
  "warning": [
    {
      "code": "DOCUMENT_COUNTRY_MISMATCH",
      "description": "Issuing country discrepancy between front and back document. Front: HK, Back: AE.",
      "severity": "high",
      "confidence": 1
    },
    {
      "code": "DOCUMENT_NAME_MISMATCH",
      "description": "Name discrepancy between front and back document. Front: Wing Ching LOK, Back: Ma Elena Esguerra Sarreal.",
      "severity": "high",
      "confidence": 0.9285714285714286
    },
    {
      "code": "FAKE_ID",
      "description": "The document uploaded is a fake or sample document, not an authentic document.",
      "severity": "high",
      "confidence": 1
    },
    {
      "code": "IMAGE_TOO_SMALL",
      "description": "The document image is too small and unlikely to be a genuine document.",
      "severity": "medium",
      "confidence": 0.835136
    },
    {
      "code": "ARTIFICIAL_IMAGE",
      "description": "Document appears to be created artificially, not a naturally taken photo.",
      "severity": "high",
      "confidence": 0.5643312530882476
    },
    {
      "code": "INVALID_CAMERA_PERSPECTIVE",
      "description": "The document image is not a naturally taken photo using a camera, it could be scanned or computer generated.",
      "severity": "medium",
      "confidence": 0.8333333333333334
    },
    {
      "code": "IP_COUNTRY_MISMATCH",
      "description": "Inconsistency between user IP address country (INVALID IP ADDRESS.) and document country (HK).",
      "severity": "low",
      "confidence": 1
    }
  ],
  "profileId": "60bb92f640dcb062c10463d0",
  "reviewScore": 1,
  "rejectScore": 5,
  "decision": "reject",
  "quota": 9999,
  "credit": 44,
  "customData": "abc",
  "executionTime": 4.630842185
}

Object.keys(response.data).map(parameters => {

  //for parameters
  response.data[parameters].filter(i => i.index == 0).map(res => {
    if (!supported_fields.includes(parameters)) {
      delete response.data[parameters]
    }

  })

})

console.log(response)

const Info = () => {





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
        return (
          <Progress
            percent={parseInt(confidence * 100)}
            style={{ marginBottom: '15px' }}
          />




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
      <div style={{ position: "relative", width: "500px" }}>


        {/* <img style={{ width: "500px" }} src={`data:image/png;base64,` + state.documentImage[name]} alt="" /> */}
        <img style={{
          maxWidth: "500px",
          height: "auto",
        }} src={state.documentImage[name]} alt="" />

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
    result: response,
    documentImage: {
      "front": "https://192.168.0.104/image/60bdecc7fd476a308d2d675a/c824c269fab01db97ee0775a1af3b09bced874e3faf851eba140f3b431f2084b/front.jpg",
      "back": "https://192.168.0.104/image/60bdecc7fd476a308d2d675a/c824c269fab01db97ee0775a1af3b09bced874e3faf851eba140f3b431f2084b/back.jpg"
    },
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

  const TableList = ({ name }) => {


    let source = []
    switch (name) {
      case 'result': {
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
        return (

          <Table className="table-responsive" pagination={false} dataSource={source} columns={docColums} showHeader={false} />

        )

      }
      case 'error': {

        state.result.warning.forEach(parameters => {
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
        // visible={state.visible}
        visible={true}
        footer={null}
        onCancel={handleCancel}
      >

        <div className="project-modal">



          <Carousel afterChange={onChange}
            // centerMode={true}
            // adaptiveHeight={true}
            dotPosition={'bottom'}
            style={{
              textAlign: "-webkit-center",
              backgroundColor: "#000",
            }}

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

          <Collapse defaultActiveKey={['1']} onChange={callback} style={
            {
              marginTop: "3%"
            }
          }>
            <Panel header="Scan Result" key="1">
              <TableList name={'result'} />
            </Panel>

            <Panel header="Error" key="2">
              <TableList name={'error'} />
            </Panel>
          </Collapse>

        </div>
      </Modal >

    </Row >
  );
};

export default Info;
