import React, {Fragment} from 'react';
import './App.css';
import HeaderComponent from './components/header/header.component'
import HomePage from './pages/HomePage/HomePage';
import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import {colapseSigninModal} from './redux/sign-in-modal/sign-in-modal.actions';
import MyRecipeBoxPage from './pages/MyRecipeBox/MyRecipeBoxPage.component';
import RecipePage from './pages/RecipePage/RecipePage.component';
import AuthPage from './pages/AuthPage/AuthPage.component';
import {fetchPublicRecipeTitlesStart} from './redux/recipes/recipes.actions'




class App extends React.Component{

componentDidMount(){
  const {checkCurrentUser, getPublicRecipeTitles}=this.props
  checkCurrentUser();
  getPublicRecipeTitles();
}



  
  render(){
    const {currentUser}=this.props;
      return (
      <Fragment>
      <HeaderComponent/>
        <Switch>
          <Route exact path='/' render={() =>  <HomePage/>}/>
          <Route exact path='/auth' render={() =>  <AuthPage/>}/>
          <Route path='/myrecipebox/' render={() => currentUser?<MyRecipeBoxPage/>:<Redirect to='/'/>}/>
          <Route path='/recipes/:recipe' render={()=><RecipePage/>}/>
        </Switch>    
      </Fragment>
    );

  }
 
}

const mapStateToProps = createStructuredSelector(
  {
    currentUser: selectCurrentUser,
  }
)

const mapDispatchToProps = dispatch => (
  {
    checkCurrentUser: ()=>dispatch(checkUserSession()),
    colapseSigninModal: ()=>dispatch(colapseSigninModal()),
    getPublicRecipeTitles: ()=>dispatch(fetchPublicRecipeTitlesStart())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App);

