import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Tooltip } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { SingleChatWrapper } from '../style';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import fieldKey from '../../../demoData/fieldKey.json';


const SingleChat = () => {
  const history = useHistory();
  const from = history.location.state.from;
  const result = history.location.state.data;
  const index = history.location.state.index;
  const data = result[index].result;
  const [state, setState] = useState({
    title: 'Transaction ID',
    value: data.transactionId || data.id
  });
  // get field info
  const info = history.location.pathname.split("/")[4];
  if (info !== undefined) {
    const title = info
    const value = data.data[info][0].value;

    useEffect(() => {
      setState({
        ...state,
        title: fieldKey[title],
        value: value
      })
    }, [info])
  }
  const blockList = [
    'dobDay', 'dobMonth',
    'dobYear', 'document',
    'endorsement', 'expiryDay',
    'expiryMonth', 'expiryYear',
    'issueAuthority', 'issuedDay',
    'issuedMonth', 'issuedYear'
  ]

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

  const ImageLoad = ({ imgData }) => {
    const [sourceLoaded, setSourceLoaded] = useState(null)
    let componentMounted = true;
    // console.log(img.width, img.height)

    useEffect(() => {
      const img = new Image()
      img.src = imgData.src
      img.onload = () => {
        let ratio = parseFloat((img.height / 300).toFixed(2))
        let divHeight = parseFloat((img.height / ratio).toFixed(2))
        let divWidth = parseFloat((img.width / ratio).toFixed(2))
        let insert = []

        Object.keys(data.data).map((ele, idx) => {

          //outputBox inputBox

          let selectBox = 'outputBox'
          if (data.outputImage_from == 'input') {
            selectBox = 'inputBox'
          }

          console.log(ele)
          data.data[ele].map((res, i) => {
            console.log(ele, res)
            if (res.index == imgData.index && res[selectBox] != null) {
              if (!blockList.includes(ele)) {

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

                // let title = ele.replace(/^./, ele[0].toUpperCase())
                let titleStr = fieldKey[ele] + ": " + res.value
                const noValueTitle = ['face']
                if (ele.includes(noValueTitle)) {
                  titleStr = fieldKey[ele]
                }
                insert.push(
                  <Tooltip key={idx} title={titleStr} id={ele + '_' + imgData.index} >
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
            }
          })


        })

        if (componentMounted) {
          setSourceLoaded({
            ...sourceLoaded,
            src: imgData.src,
            divHeight: divHeight,
            divWidth: divWidth,
            data: insert,
          })
        }
      }
      return () => {
        componentMounted = false;
      }
    }, [])


    // console.log(img.src)

    if (sourceLoaded !== null)
      return (
        <div
          style={{
            height: sourceLoaded.divHeight + "px",
            width: sourceLoaded.divWidth + "px",
            margin: "auto",
            position: "relative"
          }}>
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
            <Row justify="space-between">
              <p>{state.title}</p>
              <span>{data.decision.replace(/^./, data.decision[0].toUpperCase())}</span>
            </Row>
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
                            <ImageLoad imgData={{ src: img.value, index: index }} />                          </div>
                        </div>
                      </li>
                    </Fragment>
                  );

                })
              ) : null
            }
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
