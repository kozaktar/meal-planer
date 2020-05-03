import ShopingListTypes from './shopingList.types';

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
            };
        default:
            return state
    }
   
}

export default shopingListReducer;