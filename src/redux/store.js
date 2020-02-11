import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import createSagaMiddlware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleware=createSagaMiddlware();

const middleWares=[logger, sagaMiddleware];

export const store=createStore(rootReducer,applyMiddleware(...middleWares));

sagaMiddleware.run(rootSaga);