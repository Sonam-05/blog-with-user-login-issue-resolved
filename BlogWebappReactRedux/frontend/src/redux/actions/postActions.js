import { CREATE_POST, UPDATE_POST, DELETE_POST, GET_ALL_POSTS, GET_SINGLE_POST, GET_SEARCH_POSTS } from "../constants/postConstants"

export const createPost = (data) => {
    return {
        type: CREATE_POST,
        payload: data
    }
}

export const updatePost = (data) => {
    return {
        type: UPDATE_POST,
        payload: data
    }
}

export const deletePost = (id) => {
    return {
        type: DELETE_POST,
        payload: id
    }
}

export const getAllPosts = () => {
    return {
        type: GET_ALL_POSTS,
    }
}

export const getSinglePost = (id) => {
    return {
        type: GET_SINGLE_POST,
        payload: id
    }
}

export const getSearchPosts = (keyword) => {
    return {
        type: GET_SEARCH_POSTS,
        payload: keyword
    }
}

