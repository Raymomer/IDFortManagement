import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import { BlockSpan } from '../style';
import fieldKey from '../../../demoData/fieldKey.json';

const PrivateChat = ({ match }) => {
  const history = useHistory();
  const from = history.location.state.from;
  const result = history.location.state.data;
  const index = history.location.state.index;
  const data = result[index].result;

  const supported_fields = ["documentNumber", "personalNumber", "firstName", "middleName", "lastName", "fullName", "firstNameLocal", "middleNameLocal", "lastNameLocal", "fullNameLocal", "dob", "expiry", "issued", "sex", "height", "weight", "address1", "address2", "postcode", "placeOfBirth", "documentType", "documentName", "vehicleClass", "restrictions", "issueAuthority", "stateFull", "stateShort", "countryIso2", "countryFull", "countryIso3", "nationalityIso2", "nationalityFull", "optionalData", "optionalData2", "customdata1", "customdata2", "customdata3", "customdata4", "customdata5", "trustlevel", "trustnote", "docupass_reference", "image", "imagehash"];

  let resultSource = []

  const TableList = (name) => {
    switch (name) {
      case 'result': {
        Object.keys(data.data).map(parameters => {
          data.data[parameters].filter(i => i.index == 0).map(res => {
            if (supported_fields.includes(parameters)) {
              resultSource.push(
                {
                  "parameters": parameters,
                  "value": [res.value, res.confidence]
                }
              );
            }
          })
        })
      }
    }
  }

  TableList('result');

  return (
    <ul>
      {resultSource &&
        resultSource
          .sort((a, b) => {
            return b.parameters - a.parameters;
          })
          .map((user, key) => {
            const { parameters, value } = user;
            let real = value[0];
            let confidence = value[1];
            return (
              <li key={key} className="chat-link-signle">
                <NavLink
                  to={{
                    pathname: `${match.path}/${parameters}`,
                    state: {
                      from: from,
                      data: result,
                      index: index
                    }
                  }}
                >
                  <div className="author-info">
                    <BlockSpan className="author-name">
                      {fieldKey[parameters]}
                    </BlockSpan>
                    <BlockSpan className="author-chatText">
                      {real}
                    </BlockSpan>
                  </div>
                  <div className="author-chatMeta">
                    {confidence >= 0.8 ?
                      <Badge className="badge-success" count={confidence} /> :
                      <Badge count={confidence} />}
                  </div>
                </NavLink>
              </li>
            );
          })}
    </ul>
  );
};
PrivateChat.propTypes = {
  match: PropTypes.object,
};
export default PrivateChat;
