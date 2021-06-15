import React, { useState, lazy, Suspense } from 'react';
import { Row, Col, Badge, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { Switch, Route, NavLink, useHistory, Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { UL, Content, ChatSidebar } from './style';
import PrivetChat from './overview/PrivetChat';
import GroupChat from './overview/GroupChat';
import AllContacts from './overview/AllContacts';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';


const SingleChat = lazy(() => import('./overview/singleChat'));
const SingleGroup = lazy(() => import('./overview/SingleGroupChat'));

const ChatApp = ({ match }) => {
  const history = useHistory();
  const result = history.location.state.data;
  const index = history.location.state.index;
  const data = result[index];

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
    history.replace('/admin/email/inbox', { "response": result });
  }

  return (
    <>
      <PageHeader
        ghost
        title="Result"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="primary" onClick={goBack}>
              Back
            </Button>
          </div>,
        ]}
      />

      <Main>
        <Row gutter={30}>
          <Col xxl={13} lg={12} xs={9}>
            <ChatSidebar>
              <Cards headless>
                <nav>
                  <UL>
                    <li>
                      <NavLink activeClassName="active"
                        to={{
                          pathname: `${match.path}/private`,
                          state: {
                            data: result,
                            index: index
                          }
                        }}
                      >
                        Result
                      </NavLink>
                    </li>
                    <li>
                      <Link activeClassName="active"
                        to={{
                          pathname: `${match.path}/group`,
                          state: {
                            data: result,
                            index: index
                          }
                        }}>
                        Error
                        <Badge className="badge-error" count={data.warning.length} />
                      </Link>
                    </li>
                    <li>
                      <Link activeClassName="active"
                        to={{
                          pathname: `${match.path}/all`,
                          state: {
                            data: result,
                            index: index
                          }
                        }}>
                        Json
                      </Link>
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
                        <Route exact path={`${match.path}/private`} component={PrivetChat} />
                        <Route path={`${match.path}/group`} component={GroupChat} />
                        <Route path={`${match.path}/all`} component={AllContacts} />
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
                <Route exact path={`${match.path}/private`} component={SingleChat} />
                <Route exact path={`${match.path}/private/:title`} component={SingleChat} />
                <Route exact path={`${match.path}/group`} component={SingleChat} />
                <Route exact path={`${match.path}/all`} component={SingleChat} />
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
