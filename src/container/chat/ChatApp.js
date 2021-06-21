import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Row, Col, Badge, Form, Skeleton, Modal, Select, message } from 'antd';
import { Switch, Route, NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/authentication/actionCreator';
import { Scrollbars } from 'react-custom-scrollbars';
import { UL, Content, ChatSidebar } from './style';
import PrivetChat from './overview/PrivetChat';
import GroupChat from './overview/GroupChat';
import AllContacts from './overview/AllContacts';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';


const SingleChat = lazy(() => import('./overview/singleChat'));

const ChatApp = ({ match }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  // get token
  const token = Cookies.get('4pToken');
  const apiPath = Cookies.get('ApiEnd');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const from = history.location.state.from;
  const result = history.location.state.data;
  const index = history.location.state.index;
  const data = result[index];
  const [state, setState] = useState(data.decision);
  const [open, setOpen] = useState(false);


  console.log(data)

  const renderView = ({ style, ...props }) => {
    const customStyle = {
      marginRight: 'auto',
      right: '2px',
      marginRight: '-19px',
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  };

  const renderThumbVertical = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
      right: '2px',
    };
    return <div style={{ ...style, ...thumbStyle }} props={props} />;
  };

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      right: '6px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div style={thumbStyle} />;
  };

  const renderThumbHorizontal = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} props={props} />;
  };

  const goBack = () => {
    if (from == "scan") {
      history.replace('/admin/scan', { "response": result });
    } else if (from == "transaction") {
      history.replace('/admin/transaction');
    }
  }

  const onChange = e => {
    let value = state;
    value = e
    setState(value)
  };

  useEffect(() => {
    console.log(state);
  }, [state])

  useEffect(() => {



    console.log(result[index]);

  }, [result])

  const updateDecision = () => {
    setOpen(false)
    axios.patch(`${apiPath}/transaction/${data.id || data.transitionId}`,
      { "decision": state })
      .then(res => {
        console.log(res);
        if (res.data.success) {
          console.log(res.data);
          result[index].decision = state;
          message.success("Success", 3);
        } else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
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
  }


  return (
    <>
      <PageHeader
        ghost
        title="Result"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" onClick={() => { setOpen(true) }}>
              Update Decision
            </Button>
            <Button size="small" type="primary" onClick={goBack}>
              Back
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Modal
          title="Do you want to change decision?"
          centerd
          visible={open}
          onOk={updateDecision}
          onCancel={() => { setOpen(false) }}
          width={400}
        >
          <Form.Item>
            <Select
              defaultValue={state}
              onChange={onChange}
            >
              <Select.Option key={"accept"} value={"accept"}>Accept</Select.Option>
              <Select.Option key={"review"} value={"review"}>Review</Select.Option>
              <Select.Option key={"reject"} value={"reject"}>Reject</Select.Option>
            </Select>
          </Form.Item>
        </Modal>
        <Row gutter={30}>
          <Col xxl={13} lg={12} xs={9}>
            <ChatSidebar>
              <Cards headless>
                <nav>
                  <UL>
                    <li>
                      <NavLink activeClassName="active"
                        to={{
                          pathname: `${match.path}/result`,
                          state: {
                            from: from,
                            data: result,
                            index: index
                          }
                        }}
                      >
                        Result
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName="active"
                        to={{
                          pathname: `${match.path}/error`,
                          state: {
                            from: from,
                            data: result,
                            index: index
                          }
                        }}>
                        Error
                        <Badge className="badge-error" count={data.warning !== undefined ? data.warning.length : 0} />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName="active"
                        to={{
                          pathname: `${match.path}/json`,
                          state: {
                            from: from,
                            data: result,
                            index: index
                          }
                        }}>
                        Json
                      </NavLink>
                    </li>
                  </UL>
                </nav>
                <Content>
                  <Scrollbars
                    className="custom-scrollbar"
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                    renderThumbHorizontal={renderThumbHorizontal}
                    renderThumbVertical={renderThumbVertical}
                    renderView={renderView}
                    renderTrackVertical={renderTrackVertical}
                  >
                    <Switch>
                      <Suspense
                        fallback={
                          <Cards headless>
                            <Skeleton avatar paragraph={{ rows: 10 }} active />
                          </Cards>
                        }
                      >
                        <Route path={`${match.path}/result`} component={PrivetChat} />
                        <Route path={`${match.path}/error`} component={GroupChat} />
                        <Route path={`${match.path}/json`} component={AllContacts} />
                      </Suspense>
                    </Switch>
                  </Scrollbars>
                </Content>
              </Cards>
            </ChatSidebar>
          </Col>
          <Col xxl={11} lg={12} xs={15}>
            <Switch>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton avatar paragraph={{ rows: 10 }} active />
                  </Cards>
                }
              >
                <Route exact path={match.path} component={SingleChat} />
                <Route exact path={`${match.path}/result`} component={SingleChat} />
                <Route exact path={`${match.path}/result/:title`} component={SingleChat} />
                <Route exact path={`${match.path}/error`} component={SingleChat} />
                <Route exact path={`${match.path}/json`} component={SingleChat} />
              </Suspense>
            </Switch>
          </Col>
        </Row>
      </Main>
    </>
  );
};

ChatApp.propTypes = {
  match: PropTypes.object,
};
export default ChatApp;
