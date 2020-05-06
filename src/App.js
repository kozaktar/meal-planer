import React, {Fragment} from 'react';
import './App.css';
import HeaderComponent from './components/header/header.component'
import HomePage from './pages/HomePage/HomePage';
import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import {selectRecipeLoading} from './redux/recipes/recipes.selectors';
import {colapseSigninModal} from './redux/sign-in-modal/sign-in-modal.actions';
import MyRecipeBoxPage from './pages/MyRecipeBox/MyRecipeBoxPage.component';
import RecipePage from './pages/RecipePage/RecipePage.component';
import WithSpinner from './components/spiner/withSpiner.component';


const RecipeWithSpinner=WithSpinner(RecipePage);

class App extends React.Component{

componentDidMount(){
  const {checkCurrentUser}=this.props
  checkCurrentUser();
}


  
  render(){
    const {currentUser, loadingRecipe}=this.props;
    return (
      <Fragment>
      <HeaderComponent/>
        <Switch>
          <Route exact path='/' render={() => currentUser ? (<Redirect to='/myrecipebox/myrecipes' />) : (<HomePage />)}/>
          <Route path='/myrecipebox/' render={() => currentUser ? <MyRecipeBoxPage/>: (<Redirect to='/' />)}/>
          <Route path='/recipes/:recipe' render={()=><RecipeWithSpinner isloading={loadingRecipe}/>}/>
        </Switch>    
      </Fragment>
    );

  }
 
}

const mapStateToProps = createStructuredSelector(
  {
    currentUser: selectCurrentUser,
    loadingRecipe: selectRecipeLoading,
  }
)

const mapDispatchToProps = dispatch => (
  {
    checkCurrentUser: ()=>dispatch(checkUserSession()),
    colapseSigninModal: ()=>dispatch(colapseSigninModal()),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App);

