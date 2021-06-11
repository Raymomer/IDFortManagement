import React, { lazy, useState, useEffect, Suspense, uselo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Tooltip, Spin, Collapse, Image, Table, Progress, Pagination, Carousel, Modal } from 'antd';
import { Switch, NavLink, Route, Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import CreateProject from './overview/CreateProject';
import { ProjectHeader, ProjectSorting, ProjectList, ProjectPagination } from './style';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';

import { Cards } from '../../components/cards/frame/cards-frame';

import { filterProjectByStatus, sortingProjectByCategory } from '../../redux/project/actionCreator';
import { Main } from '../styled';

import { PageHeader } from '../../components/page-headers/page-headers';


// import TransactionResponse from './response.json'

const { Panel } = Collapse;
const supported_fields = ["documentNumber", "personalNumber", "firstName", "middleName", "lastName", "fullName", "firstNameLocal", "middleNameLocal", "lastNameLocal", "fullNameLocal", "dob", "expiry", "issued", "sex", "height", "weight", "address1", "address2", "postcode", "placeOfBirth", "documentType", "documentName", "vehicleClass", "restrictions", "issueAuthority", "stateFull", "stateShort", "countryIso2", "countryFull", "countryIso3", "nationalityIso2", "nationalityFull", "optionalData", "optionalData2", "customdata1", "customdata2", "customdata3", "customdata4", "customdata5", "trustlevel", "trustnote", "docupass_reference", "image", "imagehash"];

const Project = ({ match }) => {
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.headerSearchData);


  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    categoryActive: 'all',

  });

  const closeMailComposr = () => {
    setresultTable(null);
  };


  const { notData, visible } = state;




  const handleSearch = searchText => {
    const data = searchData.filter(item => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };




  const [api, setApi] = useState({
    limit: 10,
    order: -1,
    profile: null,
    decision: null,
    offset: 0
  })

  console.log('api =>', api)

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
  const [transactionResponse, setTransactionResponse] = useState(``)

  const [resultTable, setresultTable] = useState(null)

  const TableList = ({ name }) => {

    let source = []
    switch (name) {
      case 'result': {
        Object.keys(resultTable.data).map(parameters => {
          resultTable.data[parameters].filter(i => i.index == 0).map(res => {
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
        if (resultTable.warning == undefined || resultTable.warning.length == 0) {
          return null
        }
        resultTable.warning.forEach(parameters => {
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


  const getResponse = async () => {

    console.log("getResponse => and api is ", api)

    let down = new Promise((resolve, reject) => {
      let url = `https://192.168.0.104/transaction?limit=` + api.limit + `&order=` + api.order + `&profile&decision&offset=` + api.offset
      // let url = `https://192.168.0.104/transaction?limit=10&order=-1&profile&decision&offset=0`
      fetch(url, {
        method: 'GET',
        headers: {
          "content-type": `application/json`,
          authorization: `Bearer lQuVANCXht0IS9bYsMY2+pM9Z9/aE5E0aVIHbYF9aeY=`
        },

      }).then(res => {
        resolve(res.json())
      })
    })
    let r = {}
    let source = []

    r['response'] = await down
    r['response'].transactions.forEach(element => {
      console.log(element)
      let date = new Date(element.createdAt)
      date = date.toLocaleDateString()

      source.push({
        time: date,
        image: (
          <>
            {
              Object.keys(element.outputImage).map(res => {
                return (
                  <a href={'https://192.168.0.104/imagevault/' + element.outputImage[res]} target="_blank">
                    <img style={{ height: "100px", width: "auto" }} src={'https://192.168.0.104/imagevault/' + element.outputImage[res]} />
                  </a>
                )
              })}
          </>),
        decision: element.decision,
        action: (
          <div className="table-actions">
            <Button className="btn-icon" type="info" to="#" shape="circle" onClick={() => {

              console.log(element)
              setresultTable(element)
            }}>
              <FeatherIcon icon="edit" size={16} />
            </Button>
          </div>
        ),
      })


    })
    r['dataSource'] = source
    r['total'] = r['response']['total']
    console.log(r)
    setTransactionResponse(r)

  }



  useEffect(() => {

    console.log("useEffect")

    getResponse()

  }, [api])




  console.log(transactionResponse['dataSource'])

  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Document image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Decision',
      dataIndex: 'decision',
      key: 'decision',
      render: (ele) => {
        return (
          <p>{ele}</p>
        )
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',

    },

  ];


  return (
    <>
      <ProjectHeader>
        <PageHeader
          ghost
          title="Transactions"
          subTitle={<>Manage documents and identity information
            </>}
          buttons={[
            <Button onClick={() => {
              console.log("now project")
            }} key="1" type="primary" size="default">
              <FeatherIcon icon="plus" size={16} />Scan

            </Button>
          ]}
        />
      </ProjectHeader>
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <ProjectSorting>
              <div className="project-sort-bar">
                <div className="project-sort-nav">
                  <nav>
                    <ul>
                      <li className={state.categoryActive === 'all' ? 'active' : 'deactivate'}>
                        <Link onClick={() => setState({ ...state, categoryActive: 'all' })} to="#">
                          All
                        </Link>
                      </li>
                      <li className={state.categoryActive === 'progress' ? 'active' : 'deactivate'}>
                        <Link onClick={() => setState({ ...state, categoryActive: 'progress' })} to="#">
                          review
                        </Link>
                      </li>
                      <li className={state.categoryActive === 'complete' ? 'active' : 'deactivate'}>
                        <Link onClick={() => setState({ ...state, categoryActive: 'complete' })} to="#">
                          reject
                        </Link>
                      </li>

                    </ul>
                  </nav>
                </div>
                <div className="project-sort-search">
                  {/* <AutoComplete onSearch={handleSearch} dataSource={notData} placeholder="Search ResponseId" patterns /> */}
                  <AutoComplete onSearch={handleSearch} placeholder="Search ResponseId" patterns />

                </div>
                <div className="project-sort-group">


                </div >


              </div >
            </ProjectSorting >
            <div><p>Calender</p></div>
            <div>
              <Row gutter={25}>
                <Col xs={24}>
                  <Cards headless>
                    <ProjectList>
                      <div className="table-responsive">
                        <Table
                          pagination={{
                            showSizeChanger: true,
                            pageSizeOptions: [2, 10, 20, 50],
                            defaultPageSize: 10,
                            total: transactionResponse.total,
                            onChange: (page, pageize) => {
                              console.log("onChange")
                              console.log(page, pageize)
                              setApi({ ...api, limit: pageize, offset: (page - 1) * pageize })

                            },
                            onShowSizeChange: (current, size) => {
                              console.log("onShowSizeChange")
                              setApi({ ...api, limit: size, offset: (current - 1) * size })

                            }
                          }}

                          dataSource={transactionResponse.dataSource}
                          columns={columns}
                        />
                      </div>
                    </ProjectList>
                  </Cards>
                </Col>
              </Row>
            </div>
          </Col >
          {resultTable != null ? <Modal
            type={`primary`}
            footer={null}
            visible={resultTable != null ? true : false}
            onCancel={closeMailComposr}
            width={'80%'}
          >
            <Col xxl={19} xl={17} lg={16} md={16} xs={24}>

              <Cards title="Response" border={false} size="default" >
                <Row gutter={30} justify="center">
                  <Col lg={12} md={24} sm={24} xs={24}>

                    <Carousel
                      // afterChange={onChange}
                      dotPosition={'bottom'}
                      infinite={false}
                      style={{
                        // textAlign: "-webkit-center",
                        background: '#D2D2D2',
                        marginBottom: "10px"
                      }}
                    >
                      {

                        Object.keys(resultTable.outputImage).map((i, idx) => {
                          return (
                            <div style={{ alignSelf: "center" }}>
                              <Image
                                key={idx}
                                preview={true}
                                src={'https://192.168.0.104/imagevault/' + resultTable.outputImage[i]}
                              />
                            </div>
                          )
                        })
                      }
                    </Carousel>

                    <Collapse defaultActiveKey={['1']} style={{ marginBottom: "10px" }}>
                      <Panel header="Error" key="1">
                        <TableList name={'error'} />
                      </Panel>
                    </Collapse>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24} >
                    <Collapse defaultActiveKey={['1']}>
                      <Panel header="Result" key="1">
                        <TableList name={'result'} />
                      </Panel>
                    </Collapse>
                  </Col>
                </Row>
              </Cards>

            </Col>
          </Modal >

            : null}

        </Row >
      </Main >
    </>
  );
};

Project.propTypes = {
  match: propTypes.object,
};

export default Project;
