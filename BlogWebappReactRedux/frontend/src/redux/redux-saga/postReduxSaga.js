import { takeEvery, put } from 'redux-saga/effects';
import { message } from 'antd';
import axios from 'axios';
import { CREATE_POST, DELETE_POST, GET_ALL_POSTS, GET_SEARCH_POSTS, GET_SINGLE_POST, SET_GET_ALL_POSTS, SET_GET_SEARCH_POSTS, SET_GET_SINGLE_POST, UPDATE_POST } from '../constants/postConstants';

function* createPostSaga(actions) {
    try {
        const res = yield axios.post(`/api/v1/post/create-post`, actions.payload)
        if (res?.data.success) {
            message.success(res?.data.message);
            yield getAllPostsSaga();
        } else {
            message.error(res?.data.message);
        }
    } catch (error) {
        message.error('Something went wrong')
    }
}

function* updatePostSaga(actions) {
    try {
        const res = yield axios.put(`/api/v1/post/update-post`, actions.payload)
        if (res?.data.success) {
            message.success(res?.data.message);
            yield getAllPostsSaga();
        } else {
            message.error(res?.data.message);
        }
    } catch (error) {
        message.error('Something went wrong')
    }
}

function* deletePostSaga(actions) {
    try {
        const res = yield axios.delete(`/api/v1/post/delete-post/${actions.payload}`)
        if (res?.data.success) {
            message.success(res?.data.message);
            yield getAllPostsSaga();
        } else {
            message.error(res?.data.message);
        }
    } catch (error) {
        message.error('Something went wrong')
    }
}

function* getAllPostsSaga() {
    try {
        const res = yield axios.get(`/api/v1/post/get-all-posts`)
        if (res?.data.success) {
            // message.success(res?.data.message);
            yield put({ type: SET_GET_ALL_POSTS, payload: res.data })
        } else {
            message.error(res?.data.message);
        }
    } catch (error) {
        message.error('Something went wrong')
    }
}

function* getSinglePostSaga(action) {
    try {
        const res = yield axios.get(`/api/v1/post/get-single-post/${action.payload}`)
        if (res?.data.success) {
            // message.success(res?.data.message);
            yield put({type : SET_GET_SINGLE_POST, payload : res.data});
        } else {
            message.error(res?.data.message);
        }
    } catch (error) {
        message.error('Something went wrong')
    }
}

function* getSearchPostsSaga(action) {
    try {
        const res = yield axios.get(`/api/v1/post/search-posts/${action.payload}`)
        if (res?.data.success) {
            console.log(res?.data);
            message.success(res?.data.message);
            yield put({type : SET_GET_SEARCH_POSTS, payload : res.data});
        } else {
            message.error(res?.data.message);
        }
    } catch (error) {
        message.error('Something went wrong')
    }
}

function* postSaga() {
    yield takeEvery(CREATE_POST, createPostSaga)
    yield takeEvery(UPDATE_POST, updatePostSaga)
    yield takeEvery(DELETE_POST, deletePostSaga)
    yield takeEvery(GET_ALL_POSTS, getAllPostsSaga)
    yield takeEvery(GET_SINGLE_POST, getSinglePostSaga)
    yield takeEvery(GET_SEARCH_POSTS, getSearchPostsSaga)
}

export default postSaga;