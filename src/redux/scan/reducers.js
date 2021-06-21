import actions from './actions';

const initialSetting = {
    data: {
        "profile": [],
        "face": "",
        "verifyName": "",
        "verifyDob": "",
        "verifyAge": "",
        "verifyAddress": "",
        "verifyPostcode": "",
        "verifyDocumentNumber": "",
        "verifyName": "",
        "ip": "",
        "customData": ""
    },
    loading: false,
    error: null,
};

const initialSetSaveing = {
    data: null,
    loading: false,
    error: null
}

const initialResponse = {
    data: [],
    loading: false,
    error: null
}


const {
    CONTACT_READ_BEGIN,
    CONTACT_STAR_UPDATE_BEGIN,

    SETTING_READ_UPDATE,

    RESPONSE_READ_BEGIN,

} = actions;


const scanSetting = (state = initialSetting, action) => {
    const { type, data, err } = action;
    console.log(data)
    switch (type) {
        case CONTACT_READ_BEGIN:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_STAR_UPDATE_BEGIN:
            state.data.profile = data
            return {
                ...state,
                loading: false,
            }

        default:
            return state;
    }
};

const setSaving = (state = initialSetSaveing, action) => {
    const { type, data, err } = action
    switch (type) {
        case SETTING_READ_UPDATE: {
            state.data = { ...state.data, ...data }

            return {
                ...state,
                loading: false
            }
        }
        default:
            return state
    }
}

const responseSaving = (state = initialResponse, action) => {
    const { type, data, err } = action
    switch (type) {

        case RESPONSE_READ_BEGIN: {
            console.log(data)
            state.data.unshift(data)

            return {
                ...state,
                loading: false
            }
        }
        default:
            return state
    }

}
export { scanSetting, setSaving, responseSaving }
