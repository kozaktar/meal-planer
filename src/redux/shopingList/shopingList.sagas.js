import {takeLatest, put,all, call} from 'redux-saga/effects';
import axios from 'axios';
import {fetchShopingListSuccess, fetchShopingListFailure, updateShopingListSuccess, updateShopingListFailure} from '../shopingList/shopingList.actions'
import ShopingListActionTypes from '../shopingList/shopingList.types'

const shopingListAPIpath='http://localhost:3001/shoping-list'

function* FetchShopingList({payload}){
    try{
        yield axios.defaults.headers.common['userID'] =payload 
        const shopingList=yield axios.get(shopingListAPIpath)
        
        yield put(fetchShopingListSuccess(shopingList.data))
    }
    catch(error){
       yield put(fetchShopingListFailure(error))
    }

}

function* UpdateShopingList({payload}){
    const shopingListObj={
        shopingList:payload
    }
    try{
        yield axios.patch(shopingListAPIpath,shopingListObj).then((response)=>console.log(response))
        yield put(updateShopingListSuccess(payload))
    }
    catch(error){
       yield put(updateShopingListFailure(error.message))
    }
}


function* onShopingListFetchStart(){
    yield takeLatest(ShopingListActionTypes.FETCH_ShopingList_START, FetchShopingList)
}

function* onShopingListUpdateStart(){
    yield takeLatest(ShopingListActionTypes.UPDATE_ShopingList_START, UpdateShopingList)
}

export function* shopingListSagas(){
    yield all([call(onShopingListFetchStart), call(onShopingListUpdateStart)])
}