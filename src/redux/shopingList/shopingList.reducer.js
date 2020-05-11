import ShopingListTypes from './shopingList.types';

Array.prototype.diff=function(array2){return this.filter(x=>array2.includes(x))};

const INITAIL_STATE={
    shopingList:[],
    loading:false,
    shopingListError:null
}

const shopingListReducer=(state=INITAIL_STATE, action)=>{
    switch(action.type){
        case ShopingListTypes.ADD_TO_ShopingList:
            {
                if(!state.shopingList.includes(action.payload)){
                    return {...state, shopingList:[...state.shopingList, action.payload]}
                }
                else
                    return state
            };
        case ShopingListTypes.REMOVE_FROM_ShopingList:
            {
                const newList=state.shopingList.diff(action.payload);
                return {...state, shopingList:newList}
            }
        case ShopingListTypes.FETCH_ShopingList_SUCCESS:
            return {...state, shopingList:action.payload}    
        default:
            return state
    }
   
}

export default shopingListReducer;