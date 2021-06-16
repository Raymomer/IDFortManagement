import React, { useState, useEffect, Fragment } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Upload, message, Tooltip } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { SingleChatWrapper } from '../style';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';

const SingleChat = () => {
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
    Object.keys(data.outputImage).map(parameters => {
      if (ImageSource[parameters] === undefined) {
        ImageSource.push({
          "side": parameters,
          "value": data.outputImage[parameters]
          // data bounding box
        })
      }
    })
  }
  ImageList();



  const ImageLoad = ({ info }) => {
    const [sourceLoaded, setSourceLoaded] = useState(null)
    console.log(info)


    // console.log(img.width, img.height)

    useEffect(() => {
      const img = new Image()
      img.src = info.src
      img.onload = () => {
        let ratio = parseFloat((img.height / 300).toFixed(2))
        let divHeight = parseFloat((img.height / ratio).toFixed(2))
        let divWidth = parseFloat((img.width / ratio).toFixed(2))
        let insert = []

        Object.keys(data.data).map(ele => {

          //outputBox inputBox

          let selectBox = 'outputBox'
          if (data.outputImage_from == 'input') {
            selectBox = 'inputBox'
          }

          data.data[ele].map((res, i) => {
            if (res.index == info.index && res[selectBox] != null) {
              let draw = res[selectBox]
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
              x = parseFloat(x.toFixed(2))
              y = parseFloat(y.toFixed(2))
              w = parseFloat(w.toFixed(2))
              h = parseFloat(h.toFixed(2))


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

        setSourceLoaded({
          src: info.src,
          divHeight: divHeight,
          divWidth: divWidth,
          data: insert,
        })
      }
    }, [info])


    // console.log(img.src)

    if (sourceLoaded !== null)
      return (
        <div style={{ height: sourceLoaded.divHeight + "px", width: sourceLoaded.divWidth + "px", margin: "auto", position: "relative" }}>
          <div style={{
            height: "300px",
            width: "100%",
            borderRadius: "20px",
            backgroundImage: `url(${sourceLoaded.src})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "local",
            minHeight: sourceLoaded.divHeight,
            minWidth: sourceLoaded.divWidth,

          }}>
            {sourceLoaded.data.map(i => {
              return i
            })}
          </div>
        </div >
      )

    else {
      return (
        <></>
      )
    }
  }




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
                  console.log(ImageSource)
                  return (
                    <Fragment key={index}>
                      <li className="atbd-chatbox__single" key={index} style={{ overflow: 'hidden' }}>
                        <div className="atbd-chatbox__content">
                          <h3 className="atbd-chatbox__name">
                            {img.side.toUpperCase()}
                          </h3>
                          <div className="atbd-chatbox__contentInner d-flex">
                            <ImageLoad info={{ src: img.value, index: index }} />                          </div>
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
