import {all, call} from 'redux-saga/effects';
import {userSagas} from './user/user.sagas';
import {recipeSagas} from './recipes/recipes.sagas'



export default function* rootSaga(){
    yield all([
        call(userSagas), call(recipeSagas)
    ])
}