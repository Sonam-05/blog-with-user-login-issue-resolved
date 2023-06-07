import { combineReducers } from "redux";
import { postReducer } from "./reducers/postReducers";
import { userReducer } from "./reducers/userReducers";
import { commentReducer } from "./reducers/commentReducers";

export default combineReducers({ postReducer, userReducer, commentReducer })