import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { connect } from 'react-redux';
import {addToShopingList} from '../../redux/shopingList/shopingList.actions';
import {updateShopingListStart} from '../../redux/shopingList/shopingList.actions';
import {selectUserShopingList} from '../../redux/shopingList/shopingList.selectors';
import {createStructuredSelector} from 'reselect';

const styles={
    list:{
        listStyleType:'none',
        columnCount:'2',
        columnWidth:'200px'
    }
}


class IngredientList extends React.Component{

    constructor(props){
        super();
    }

    componentWillUnmount(){
        const {updateShopingList, shopingList}=this.props;
        updateShopingList(shopingList);
    }

   
    
    addIngredient=(idx)=>{
        const {ingredients, addIngredientToList}=this.props
        const item=ingredients[idx]
        addIngredientToList(item);
    }

    render(){
        const {ingredients}=this.props
        return(
            <ul style={styles.list}>
                {ingredients.map((ingredient, idx)=>(
                <li key={idx}>
                    <IconButton onClick={()=>this.addIngredient(idx)}>
                        <AddCircleIcon/>
                    </IconButton>
                    {ingredient}
                </li>))}
            </ul>
                )

    }
       
    
}

const mapStateToProps = createStructuredSelector(
    {
      shopingList: selectUserShopingList
    }
  )

const mapDispatchToProp=dispatch=>({
    addIngredientToList: (ingredient)=>dispatch(addToShopingList(ingredient)),
    updateShopingList:(list)=>dispatch(updateShopingListStart(list))
})



export default connect(mapStateToProps,mapDispatchToProp)(IngredientList)