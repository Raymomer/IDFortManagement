/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect, Fragment } from 'react';
import { Row, Upload, message, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SmileOutlined, MoreOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import Picker from 'emoji-picker-react';
import { SingleChatWrapper, MessageList, Footer, BackShadowEmoji } from '../style';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { updatePrivetChat } from '../../../redux/chat/actionCreator';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../components/dropdown/dropdown';

const SingleChat = ({ match }) => {
  const history = useHistory();
  const result = history.location.state.data;
  const index = history.location.state.index;
  const data = result[index];
  const [state, setState] = useState({
    title: 'Transaction ID',
    value: data.transactionId
  });
  // get field info
  const info = history.location.pathname.split("/")[5];
  if (info !== undefined) {
    console.log(info + '_0')
    console.log(document.getElementById(info + '_0'))
    const title = info.replace(/^./, info[0].toUpperCase())
    const value = data.data[info][0].value;

    useEffect(() => {

      setState({
        ...state,
        title: title,
        value: value
      })
    }, [info])
  }



  let ImageSource = [];
  const ImageList = () => {
    console.log(data)
    Object.keys(data.outputImage).map((parameters, idx) => {
      console.log(idx)




      if (ImageSource[parameters] === undefined) {
        ImageSource.push({
          "side": parameters,
          "value": data.outputImage[parameters]

        })
      }
    })
  }
  ImageList();

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



  const ImageLoad = ({ info }) => {

    console.log(info)
    let insert = []

    const img = new Image()
    img.src = info.src
    console.log(img.width, img.height)
    let ratio = img.height / 300
    let divHeight = img.height / ratio
    let divWidth = img.width / ratio

    Object.keys(data.data).map(ele => {
      data.data[ele].map((res, i) => {
        if (res.index == info.index && res.inputBox != null) {
          let draw = res.inputBox
          let x, y, w, h

          if (divHeight > divWidth) {
            x = draw[3][0] / ratio
            y = draw[3][1] / ratio
            w = (draw[0][0] - draw[3][0]) / ratio
            h = (draw[1][1] - draw[0][1]) / ratio
          } else {
            x = draw[0][0] / ratio
            y = draw[0][1] / ratio
            w = (draw[1][0] - draw[0][0]) / ratio
            h = (draw[3][1] - draw[0][1]) / ratio
          }

          console.log(ratio)
          console.log(ele, " : ", res.value)
          console.log(draw)
          console.log(x, y, w, h)
          let title = ele.replace(/^./, ele[0].toUpperCase())
          insert.push(
            <Tooltip title={title + ": " + res.value} id={ele + '_' + info.index} >
              <label style={{
                position: "absolute",
                left: x,
                top: y,
                width: w,
                height: h,
                border: `1px #ABFFFF solid`
              }}
                key={i}
              >

              </label>
            </Tooltip>)
        }

      })

    })


    return (
      <div style={{ height: divHeight + "px", width: divWidth + "px", margin: "auto", position: "relative" }}>
        <div style={{
          height: "300px",
          width: "100%",
          borderRadius: "20px",
          backgroundImage: `url(${info.src})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local"
        }}>


          {insert.map(i => {
            return i
          })}
        </div>

      </div>)
  }
  return (
    <SingleChatWrapper>
      <Cards
        title={
          <>
            <Heading as="h5">{state.value}</Heading>
            <p>{state.title}</p>
          </>
        }
      >
        <ul className="atbd-chatbox">
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
            {ImageSource.length ?
              (
                ImageSource.map((img, index) => {
                  return (
                    <Fragment key={index}>
                      <li className="atbd-chatbox__single" key={index} style={{ overflow: 'hidden' }}>
                        <div className="atbd-chatbox__content">
                          <h3 className="atbd-chatbox__name">
                            {img.side.toUpperCase()}
                          </h3>
                          <div className="atbd-chatbox__contentInner d-flex">
                            <ImageLoad info={{ src: img.value, index: index }} />
                            {/* <Image src={img.value} style={{ width: '450px' }} alt={img.side} /> */}
                          </div>
                        </div>
                      </li>
                    </Fragment>
                  );

                })
              ) : (
                <p>No Image found</p>
              )}
          </Scrollbars>
        </ul>
      </Cards>
    </SingleChatWrapper>
  );
};

SingleChat.propTypes = {
  match: PropTypes.object,
};
export default SingleChat;
