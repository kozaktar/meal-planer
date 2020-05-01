import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { connect } from 'react-redux';
import {addToShopingList} from '../../redux/shopingList/shopingList.actions'

const styles={
    list:{
        listStyleType:'none',
        columnCount:'2',
        columnWidth:'200px'
    }
}


const IngredientList=({ingredients,addIngredientToList})=>{
    
    const addIngredient=(idx)=>{
        const item=ingredients[idx]
        addIngredientToList(item);
    }

        return(
    <ul style={styles.list}>
        {ingredients.map((ingredient, idx)=>(
        <li key={idx}>
            <IconButton onClick={()=>addIngredient(idx)}>
                <AddCircleIcon/>
            </IconButton>
            {ingredient}
        </li>))}
    </ul>
        )
    
}

const mapDispatchToProp=dispatch=>({
    addIngredientToList: (ingredient)=>dispatch(addToShopingList(ingredient))
})



export default connect(null,mapDispatchToProp)(IngredientList)