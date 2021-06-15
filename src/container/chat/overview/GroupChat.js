import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import { BlockSpan, ChatWrapper } from '../style';
import { textRefactor } from '../../../components/utilities/utilities';
import { filterSinglepageGroup } from '../../../redux/chat/actionCreator';
import { Button } from '../../../components/buttons/buttons';

const GroupChat = ({ match }) => {
  const history = useHistory();
  const result = history.location.state.data;
  const index = history.location.state.index;
  const data = result[index];

  let errorSource = []

  const TableList = (name) => {
    switch (name) {
      case 'error': {
        if (data.warning == undefined || data.warning.length == 0) {
          return null
        }
        data.warning.forEach(parameters => {
          errorSource.push({
            "parameters": [parameters.code, parameters.description],
            "value": parameters.confidence
          })
        })
      }
    }
  }

  TableList('error');

  return (
    <ChatWrapper>
      <ul>
        {errorSource &&
          errorSource
            .sort((a, b) => {
              return b.time - a.time;
            })
            .map((user, key) => {
              const { parameters, value } = user;
              let real = parameters[0];
              let desc = parameters[1];
              return (
                <li key={key} className="chat-link-signle">
                  <a>
                    <div className="author-info">
                      <BlockSpan className="author-name">{real}</BlockSpan>
                      <BlockSpan className="author-chatText">{desc}</BlockSpan>
                    </div>
                    <div className="author-chatMeta">
                      {value >= 0.8 ?
                        <Badge count={value == 1? value: value.toFixed(3)} />:
                        <Badge className="badge-success" count={value.toFixed(3)} /> }
                    </div>
                  </a>
                </li>
              );
            })}
      </ul>
    </ChatWrapper>
  );
};

GroupChat.propTypes = {
  match: PropTypes.object,
};

export default GroupChat;
