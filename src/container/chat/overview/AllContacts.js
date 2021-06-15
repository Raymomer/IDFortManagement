import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import { BlockSpan, ChatWrapper } from '../style';
import { textRefactor } from '../../../components/utilities/utilities';
import { filterSinglePage } from '../../../redux/chat/actionCreator';
import { Button } from '../../../components/buttons/buttons';

// import the react-json-view component
import ReactJson from 'react-json-view'

const AllContacts = ({ match }) => {
  const history = useHistory();
  const result = history.location.state.data;
  const index = history.location.state.index;
  const data = result[index];

  const preStyle = {
    display: 'block',
    padding: '10px 30px',
    margin: '0',
  };
  console.log(history)

  return (
    <ChatWrapper>
      <ul>
        {data &&

          <ReactJson
            src={data}
            style={preStyle}
            collapsed={1}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false} />

        }
      </ul>
    </ChatWrapper>
  );
};
AllContacts.propTypes = {
  match: PropTypes.object,
};
export default AllContacts;
