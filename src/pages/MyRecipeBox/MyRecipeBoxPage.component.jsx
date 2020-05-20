import React from 'react';
import {Route} from 'react-router-dom';
import MyRecipiesComponent from '../MyRecipes/MyRecipies.component';
import SideNavBar from '../../components/side-nav-bar/SideNavBar.component';
import Container from '@material-ui/core/Container';
import WithSpinner from '../../components/spiner/withSpiner.component'
import { createStructuredSelector } from 'reselect';
import { selectRecipeLoading, selectUserRecipes } from '../../redux/recipes/recipes.selectors';
import {connect} from 'react-redux';
import ShopingListPage from './../ShopingListPage/ShopingListPage.component';

const MyRecipiesComponentWithSpinner=WithSpinner(MyRecipiesComponent);

const styles={
    flex:{
        display:'flex',
    },
    fullPage:{
        
        // overflow:'hidden',
       // marginLeft:'-30px',
        //position: 'absolute',
       // left:60
    }
}

const MyRecipeBoxPage=({recipesLoading})=>(
    <Container maxWidth="xl">
      <SideNavBar/>
    <div style={styles.fullPage}>
        <Route exact path={"/myrecipebox/myrecipes"} render={()=><MyRecipiesComponentWithSpinner isloading={recipesLoading}/>}/>
        <Route exact path={"/myrecipebox/mygrocerylist"} component={ShopingListPage}/>
    </div>
    </Container>
)

const mapStateToProps = createStructuredSelector(
    {
      recipesLoading: selectRecipeLoading,
      recipes: selectUserRecipes
    }
  )

export default connect(mapStateToProps,null)(MyRecipeBoxPage);