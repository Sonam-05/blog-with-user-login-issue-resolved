import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import postSaga from './redux-saga/postReduxSaga';
import userSaga from './redux-saga/userReduxSaga';
import commentSaga from './redux-saga/commentReduxSaga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: () => [sagaMiddleware]
});

sagaMiddleware.run(postSaga);
sagaMiddleware.run(userSaga);
sagaMiddleware.run(commentSaga);

export default store;