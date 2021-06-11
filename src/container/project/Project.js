import React, { lazy, useState, useEffect, Suspense, uselo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, Select, Image, Table, Progress, Pagination, Tag } from 'antd';
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



const Project = ({ match }) => {
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.headerSearchData);


  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    categoryActive: 'all',

  });




  const { notData, visible } = state;




  const handleSearch = searchText => {
    const data = searchData.filter(item => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onSorting = selectedItems => {
    dispatch(sortingProjectByCategory(selectedItems));
  };


  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
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

  const [transactionResponse, setTransactionResponse] = useState(``)

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
              console.log("click")
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
            <Button onClick={showModal} key="1" type="primary" size="default">
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
                  <div className="sort-group">
                    <span>Calender</span>
                    {/* <div className="layout-style">
                      <NavLink to={`${ path } /grid`}>
                          < FeatherIcon icon = "grid" size = { 16} />
                                            </NavLink >
                        <NavLink to={`${path}/list`}>
                          <FeatherIcon icon="list" size={16} />
                        </NavLink>
                    </div > */}
                  </div >
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
          {/* <Col xs={24} className="pb-30">


            <Pagination

              total={transactionResponse.total}
              showSizeChanger
            />


          </Col> */}
        </Row >
        <CreateProject onCancel={onCancel} visible={visible} />
      </Main >
    </>
  );
};

Project.propTypes = {
  match: propTypes.object,
};

export default Project;
