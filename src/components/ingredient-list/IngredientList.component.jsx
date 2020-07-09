import React, { Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { connect } from 'react-redux';
import {addToShopingList} from '../../redux/shopingList/shopingList.actions';
import {updateShopingListStart} from '../../redux/shopingList/shopingList.actions';
import {selectUserShopingList} from '../../redux/shopingList/shopingList.selectors';
import {createStructuredSelector} from 'reselect';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'; 

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
        this.state={
            open:false,
            added:null
        }
    }

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({...this.state, open:false})
    }
    
    addIngredient=(idx)=>{
        const {ingredients, addIngredientToList, updateShopingList, shopingList}=this.props
        const item=ingredients[idx]
        if(!shopingList.includes(item)){
        addIngredientToList(item);
        shopingList.push(item)
        updateShopingList(shopingList);
        }
    }

    render(){
        const {ingredients}=this.props
        return(
            <Fragment>
                 <Snackbar open={this.state.open} autoHideDuration={2000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                         Added {this.state.added} to your shopping list!
                    </Alert>
                 </Snackbar>
          
            <ul style={styles.list}>
                {ingredients.map((ingredient, idx)=>(
                <li key={idx}>
                    <IconButton onClick={()=>{this.addIngredient(idx); this.setState({added:ingredient ,open:true})}}>
                        <AddShoppingCartIcon/>
                    </IconButton>
                    {ingredient}
                </li>))}
            </ul>
            </Fragment>
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