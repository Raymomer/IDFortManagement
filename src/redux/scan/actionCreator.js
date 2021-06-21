import actions from './actions';

const { readBegin, starUpdateBegin, settingUpdate, responseUpdate } = actions;



const profileUpdate = (val) => {
  console.log(val)
  return async dispatch => {
    try {
      dispatch(readBegin());
      dispatch(starUpdateBegin(val));

    } catch (err) {
      dispatch(starUpdateErr(err));
    }
  };
};


const scanSetSaving = (val) => {
  console.log(val)
  return async dispatch => {
    try {
      dispatch(settingUpdate(val));

    } catch {
      console.log('123')
    }
  };
}

const scanResponseSaving = (val) => {
  return async dispatch => {
    try {
      dispatch(responseUpdate(val));

    } catch {
      console.log('scanResponseSaving')
    }
  };
}



export { profileUpdate, scanSetSaving, scanResponseSaving };