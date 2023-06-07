import { SET_GET_ALL_COMMENTS, SET_GET_ALL_COMMENTS_POSTID, SET_GET_SINGLE_COMMENT } from "../constants/commentConstants";

export const commentReducer = (state = null, actions) => {
    switch (actions.type) {
        case SET_GET_ALL_COMMENTS:
            return actions.payload;
        case SET_GET_ALL_COMMENTS_POSTID:
            return actions.payload;
        case SET_GET_SINGLE_COMMENT:
            return actions.payload;
        default:
            return state;
    }
}