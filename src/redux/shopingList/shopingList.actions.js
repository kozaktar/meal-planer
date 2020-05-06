import ShopingListActionTypes from './shopingList.types';

export const fetchShopingListStart=(user)=>(
    {
        type:ShopingListActionTypes.FETCH_ShopingList_START,
        payload:user
    }
);

export const fetchShopingListSuccess=(shopingList)=>(
    {
        type:ShopingListActionTypes.FETCH_ShopingList_SUCCESS,
        payload:shopingList
    }
);

export const fetchShopingListFailure=(error)=>(
    {
        type:ShopingListActionTypes.FETCH_ShopingList_FAILURE,
        payload:error
    }
);

export const updateShopingListStart=(listAndUser)=>(
    {
        type:ShopingListActionTypes.UPDATE_ShopingList_START,
        payload:listAndUser
    }
);

export const updateShopingListSuccess=()=>(
    {
        type:ShopingListActionTypes.UPDATE_ShopingList_SUCCESS,
    }
);

export const updateShopingListFailure=(error)=>(
    {
        type:ShopingListActionTypes.FETCH_ShopingList_FAILURE,
        payload:error
    }
);

export const addToShopingList=(item)=>(
    {
        type:ShopingListActionTypes.ADD_TO_ShopingList,
        payload:item
    }
);