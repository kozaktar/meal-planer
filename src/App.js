import React from 'react';
import './App.css';
import HeaderComponent from './components/header/header.component'
import HomePage from './pages/HomePage/HomePage';
import {Switch, Route, Redirect} from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import {toggleDropdown} from './redux/sign-in-modal/sign-in-modal.actions';
import MyRecipies from './pages/MyRecipes/MyRecipies.component';
import MyRecipeBoxPage from './pages/MyRecipeBox/MyRecipeBoxPage.component'

class App extends React.Component{

  unsubscribeFromAuth=null;

  componentDidMount(){

    const { setCurrentUser, toggleDropdown } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  if (userAuth && userAuth.displayName) {
      const user= await createUserProfileDocument(userAuth);
      setCurrentUser(user);
      toggleDropdown();
  }else{
    setCurrentUser(null);
  }

   
})
  }
  
  
  render(){
    const {currentUser}=this.props;
    return (
      <div className='main-container'>
      <HeaderComponent/>
        <Switch>
          <Route exact path='/' render={() => currentUser ? (<Redirect to='/myrecipebox/myrecipes' />) : (<HomePage />)}/>
          <Route path='/myrecipebox' render={() => !currentUser ? (<Redirect to='/' />) : (<MyRecipeBoxPage/>)}/>
        </Switch> 
        
      </div>
    );

  }
 
}

const mapStateToProps = createStructuredSelector(
  {
    currentUser: selectCurrentUser
  }
)

const mapDispatchToProps = dispatch => (
  {
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    toggleDropdown: ()=>dispatch(toggleDropdown())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App);

