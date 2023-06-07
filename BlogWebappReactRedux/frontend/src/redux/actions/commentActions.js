import { CREATE_COMMENT, DELETE_COMMENT, GET_ALL_COMMENTS, GET_ALL_COMMENTS_POSTID, GET_SINGLE_COMMENT, UPDATE_COMMENT } from "../constants/commentConstants"

export const createComment = (data) => {
    return {
        type : CREATE_COMMENT,
        payload : data
    }
}

export const updateComment = (data) => {
    return {
        type : UPDATE_COMMENT,
        payload : data
    }
}

export const deleteComment = (id) => {
    return {
        type : DELETE_COMMENT,
        payload : id
    }
}


export const getAllComments = () => {
    return {
        type : GET_ALL_COMMENTS
    }
}

export const getAllCommentsPostId = (id) => {
    return {
        type : GET_ALL_COMMENTS_POSTID,
        payload : id
    }
}

export const getSingleComment = (id) => {
    return {
        type : GET_SINGLE_COMMENT,
        payload : id
    }
}
