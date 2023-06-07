import { takeEvery, put } from "redux-saga/effects";
import { CREATE_COMMENT, DELETE_COMMENT, GET_ALL_COMMENTS, GET_ALL_COMMENTS_POSTID, GET_SINGLE_COMMENT, SET_GET_ALL_COMMENTS, SET_GET_ALL_COMMENTS_POSTID, SET_GET_SINGLE_COMMENT, UPDATE_COMMENT } from "../constants/commentConstants";
import { message } from "antd";
import axios from "axios";

function* createCommentSaga(actions) {
    try {
        const res = yield axios.post('/api/v1/comment/create-comment', { ...actions.payload }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        });
        if (res?.data?.success) {
            message.success(res.data.message);
            const pid={
                payload: actions.payload.postId
            }
            yield getAllCommentsPostIdSaga(pid)
        } else {
            message.error(res?.data.message)
        }
    } catch (error) {
        message.error('Something went wrong in createCommentSaga')
    }
}

function* updateCommentSaga(actions) {
    try {
        const res = yield axios.post(`/api/v1/comment/update-comment/${actions.payload.id}`, actions.payload);
        if (res?.data.success) {
            message.success(res.data.message)
        } else {
            message.error(res?.data.message)
        }
    } catch (error) {
        message.error('Something went wrong in createCommentSaga')
    }
}

function* deleteCommentSaga(actions) {
    try {
        const res = yield axios.post(`/api/v1/comment/delete-comment/${actions.payload}`);
        if (res?.data.success) {
            message.success(res.data.message)
        } else {
            message.error(res?.data.message)
        }
    } catch (error) {
        message.error('Something went wrong in createCommentSaga')
    }
}

function* getAllCommentsSaga() {
    try {
        const res = yield axios.post('/api/v1/comment/get-all-comments');
        if (res?.data.success) {
            // message.success(res.data.message)
            yield put({ type: SET_GET_ALL_COMMENTS, payload: res.data })
        } else {
            message.error(res?.data.message)
        }
    } catch (error) {
        message.error('Something went wrong in createCommentSaga')
    }
}

function* getSingleCommentSaga(actions) {
    try {
        const res = yield axios.post(`/api/v1/comment/get-single-comment/${actions.payload}`);
        if (res?.data.success) {
            // message.success(res.data.message)
            yield put({ type: SET_GET_SINGLE_COMMENT, payload: res.data })
        } else {
            message.error(res?.data.message)
        }
    } catch (error) {
        message.error('Something went wrong in createCommentSaga')
    }
}

function* getAllCommentsPostIdSaga(actions) {
    try {
        const res = yield axios.get(`/api/v1/comment/get-all-comments-postID/${actions.payload}`);
        if (res?.data?.success) {
            // message.success(res.data.message)
            yield put({ type: SET_GET_ALL_COMMENTS_POSTID, payload: res.data })
        } else {
            message.error(res?.data.message)
        }
    } catch (error) {
        message.error('Something went wrong in createCommentSaga')
    }
}


function* commentSaga() {
    yield takeEvery(CREATE_COMMENT, createCommentSaga);
    yield takeEvery(UPDATE_COMMENT, updateCommentSaga);
    yield takeEvery(DELETE_COMMENT, deleteCommentSaga);
    yield takeEvery(GET_ALL_COMMENTS, getAllCommentsSaga);
    yield takeEvery(GET_ALL_COMMENTS_POSTID, getAllCommentsPostIdSaga)
    yield takeEvery(GET_SINGLE_COMMENT, getSingleCommentSaga);
}

export default commentSaga;