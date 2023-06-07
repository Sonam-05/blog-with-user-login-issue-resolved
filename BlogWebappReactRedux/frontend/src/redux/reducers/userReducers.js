import { SET_GET_ALL_USERS, SET_GET_SINGLE_USER, SET_LOGGEDIN_USER, SET_LOGIN_USER, SET_LOGOUT_USER, SET_REGISTER_USER } from "../constants/userConstants";

export const userReducer = (state = null, actions) => {
    switch (actions.type) {
        case SET_REGISTER_USER:
            return actions.payload;
        case SET_LOGIN_USER:
            // console.log(actions.payload);
            return actions.payload;
        case SET_GET_ALL_USERS:
            return actions.payload;
        case SET_LOGOUT_USER:
            return actions.payload;
        case SET_LOGGEDIN_USER:
            return actions.payload;
        case SET_LOGOUT_USER:
            return actions.payload;
        default:
            return state;
    }
}