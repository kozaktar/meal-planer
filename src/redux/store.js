import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
<<<<<<< HEAD
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleware=createSagaMiddleware()
=======
import createSagaMiddlware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleware=createSagaMiddlware();
>>>>>>> tmp

const middleWares=[logger, sagaMiddleware];

export const store=createStore(rootReducer,applyMiddleware(...middleWares));

<<<<<<< HEAD
sagaMiddleware.run(rootSaga)
=======
sagaMiddleware.run(rootSaga);
>>>>>>> tmp
