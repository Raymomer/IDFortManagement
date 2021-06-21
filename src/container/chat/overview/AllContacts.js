import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ChatWrapper } from '../style';

// import the react-json-view component
import ReactJson from 'react-json-view'

const AllContacts = ({ match }) => {
  const history = useHistory();
  const from = history.location.state.from;
  const result = history.location.state.data;
  const index = history.location.state.index;
  const data = result[index].result;

  const preStyle = {
    display: 'block',
    padding: '10px 30px',
    margin: '0',
  };

  return (
    <ChatWrapper>
      <ul>
        {data &&
          // <pre style={preStyle}>{JSON.stringify(data, null, 2)}</pre>
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
