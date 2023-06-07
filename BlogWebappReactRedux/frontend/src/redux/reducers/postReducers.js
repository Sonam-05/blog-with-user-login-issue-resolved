import { SET_GET_ALL_POSTS, SET_GET_SEARCH_POSTS, SET_GET_SINGLE_POST } from "../constants/postConstants";

export const postReducer = (state = null, actions) => {
    switch (actions.type) {
        case SET_GET_ALL_POSTS:
            return actions.payload;
        case SET_GET_SINGLE_POST:
            return actions.payload;
        case SET_GET_SEARCH_POSTS:
            return actions.payload;
        default:
            return state;
    }
}