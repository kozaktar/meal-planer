import {createSelector} from 'reselect';

const selectShopingList=state=>state.shopingList

export const selectShoppingListError=createSelector(
    [selectShopingList],
    shopingList=>shopingList.shopingListError
);

export const selectShopingListLoading=createSelector(
    [selectShopingList],
    shopingList=>shopingList.loading
);

export const selectUserShopingList=createSelector(
    [selectShopingList],
    shopingList=>shopingList.shopingList
)