import { takeEvery, put } from 'redux-saga/effects';
import { DELETE_USER, GET_ALL_USERS, GET_LOGGEDIN_USER, GET_SINGLE_USER, LOGIN_USER, REGISTER_USER, SET_GET_ALL_USERS, SET_GET_SINGLE_USER, SET_LOGIN_USER, SET_REGISTER_USER, UPDATE_USER, SET_LOGGEDIN_USER, GET_LOGOUT_USER, SET_LOGOUT_USER } from '../constants/userConstants';
import { message } from 'antd';
import axios from 'axios'

// function* registerUserSaga(actions) {
//     try {
//         const res = yield axios.post('/api/v1/user/register', actions.payload);
//         if (res?.data.success) {
//             message.success(res?.data.message);
//             yield put({type : SET_REGISTER_USER, payload : res.data})
//         } else {
//             message.error(res?.data.message)
//         }
//     } catch (error) {
//         message.error('Something went wrong in registerUserSaga')
//     }
// }

function* loginUserSaga(actions) {
    try {
        const res = yield axios.post('/api/v1/user/login', actions.payload);
        if (res?.data.success) {
            // console.log(res.data)
            message.success(res.data.message);
            localStorage.setItem("userToken", res.data.token);
            // yield getSingleUserSaga(res.data._id);
            yield put({ type: SET_LOGIN_USER, payload: res.data });
        } else {
            message.error(res?.data.message)
        }
    } catch (error) {
        message.error('Something went wrong in loginUserSaga')
    }
}

function* updateUserSaga(actions) {
    try {
        const res = yield axios.post(`/api/v1/user/update-user/${actions.payload}`);
        if (res?.data.success) {
            message.success(res.data.message);
        } else {
            message.error(res?.data.message)
        }
    } catch (error) {
        message.error('Something went wrong in updateUserSaga')
    }
}

function* deleteUserSaga(actions) {
    try {
        const res = yield axios.post(`/api/v1/user/delete-user/${actions.payload}`);
        if (res?.data.success) {
            message.success(res.data.message);
        } else {
            message.error(res?.data.message)
        }
    } catch (error) {
        message.error('Something went wrong in deleteUserSaga')
    }
}

function* getAllUsersSaga() {
    try {
        const res = yield axios.get('/api/v1/user/get-all-users');
        if (res?.data.success) {
            message.success(res.data.message);
            yield put({ type: SET_GET_ALL_USERS, payload: res.data })
        } else {
            message.error(res?.data.message)
        }
    } catch (error) {
        message.error('Something went wrong in getAllUsersSaga')
    }
}

// function* getSingleUserSaga(actions) {
//     try {
//         const res = yield axios.get(`/api/v1/user/get-single-user/${actions.payload}`);
//         if (res?.data.success) {
//             message.success(res.data.message);
//             yield put({ type: SET_GET_SINGLE_USER, payload: res.data })
//         } else {
//             message.error(res?.data.message)
//         }
//     } catch (error) {
//         message.error('Something went wrong in getSingleUserSaga')
//     }
// }

function* getLoggedInUserSaga(actions) {
    try {
        const res = yield axios.get(`/api/v1/user/get-loggedin-user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        });
        if (res?.data.success) {
            yield put({ type: SET_LOGGEDIN_USER, payload: res.data })
        } else {
            const data = {
                success: true,
                user: null
            }
            yield put({
                type: SET_LOGOUT_USER,
                payload: data
            })
        }
    } catch (error) {
    }
}

function* getLogoutUserSaga(actions) {
    const data = {
        message: "Logout Successful!",
        success: true,
        user: null
    }
    yield put({
        type: SET_LOGOUT_USER,
        payload: data
    })
}

function* userSaga() {
    // yield takeEvery(REGISTER_USER, registerUserSaga);
    yield takeEvery(LOGIN_USER, loginUserSaga);
    yield takeEvery(UPDATE_USER, updateUserSaga);
    yield takeEvery(DELETE_USER, deleteUserSaga);
    yield takeEvery(GET_ALL_USERS, getAllUsersSaga);
    // yield takeEvery(GET_SINGLE_USER, getSingleUserSaga);
    yield takeEvery(GET_LOGGEDIN_USER, getLoggedInUserSaga);
    yield takeEvery(GET_LOGOUT_USER, getLogoutUserSaga);
}

export default userSaga;