import { ActionTypes } from "../constants"

const initialState = {
    user_token : "",
    login_status: false,
}

export const userReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case ActionTypes.USER_LOGIN:
            return { ...state, user_token: payload, login_status: true};
        default :
            return state;
    }
}