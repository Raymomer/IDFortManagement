const actions = {
  CONTACT_READ_BEGIN: 'CONTACT_READ_BEGIN',
  CONTACT_STAR_UPDATE_BEGIN: 'CONTACT_STAR_UPDATE_BEGIN',

  SETTING_READ_UPDATE: 'SETTING_READ_UPDATE',

  RESPONSE_READ_BEGIN: 'RESPONSE_READ_BEGIN',



  readBegin: () => {
    return {
      type: actions.CONTACT_READ_BEGIN,
    };
  },
  starUpdateBegin: data => {
    return {
      type: actions.CONTACT_STAR_UPDATE_BEGIN,
      data: data,
    };
  },

  settingUpdate: data => {
    return {
      type: actions.SETTING_READ_UPDATE,
      data: data,
    };
  },

  responseUpdate: data => {
    return {
      type: actions.RESPONSE_READ_BEGIN,
      data: data,
    };
  }

};

export default actions;
