

const recipeFormReducer=(state,action)=>{
    switch(action.type){
      case 'updateTitle':
        return {...state, title:action.payload};
      case 'updateDescription':
        return {...state, description:action.payload};
      case 'updatePortions':
        return {...state, portions:action.payload};
      case 'updatePrepTime':
        return {...state, prepTime:action.payload};  
      case 'updateIngredients':
        const updatedIngredients=[...state.ingredients]
        updatedIngredients[action.idx]=action.payload;
        return {...state, ingredients:updatedIngredients};
      case 'updateDirections':
        const updatedDirections=[...state.directions]
        updatedDirections[action.idx]=action.payload;
        return {...state, directions:updatedDirections};
      case 'addDirections':
          return {...state, directions:[...state.directions,'']};
      case 'removeDirections':
          const directionsPostDeletion=[...state.directions];
          directionsPostDeletion.splice(action.payload, 1);
          return {...state, directions:directionsPostDeletion};  
      case 'addIngredients':
          return {...state, ingredients:[...state.ingredients,'']};
      case 'removeIngredients':
          const ingredientsPostDeletion=[...state.ingredients];
          ingredientsPostDeletion.splice(action.payload,1);
          return {...state, ingredients:ingredientsPostDeletion};
      case 'addImage':
          return {...state, img:action.payload};
      case 'removeImage':
        return {...state, img:null};
      case 'updateVisibility':
          return {...state, visibility:action.payload};
      default:
         return state;
    }
  }

  export default recipeFormReducer;