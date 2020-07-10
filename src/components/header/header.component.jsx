import React from 'react';
import {HeaderComponentDiv, LinksContainerDiv, LogoContainer} from './header.styles';
import {connect} from 'react-redux';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions';
import SignInDropDown from '../Sign-In-DropDown/signInDropDown.component';
import {selectHiddenSignInModal} from '../../redux/sign-in-modal/sign-in-modal.selector';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {signOutStart, clearUserError} from '../../redux/user/user.actions'
import {createStructuredSelector} from 'reselect';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'
import {selectRecipeError} from '../../redux/recipes/recipes.selectors';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Portal from '@material-ui/core/Portal';
import {clearRecipeError} from '../../redux/recipes/recipes.actions';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles(theme => ({
    headerButton:{
        color:'grey',
        borderColor:'rgba(0,0,0,0)',
        '&:hover':{
            color:'black',
            borderSyle:'solid',
            borderColor:'rgba(192,192,192,0.7)',
            backgroundColor:'rgba(0,0,0,0)'
        },
        [theme.breakpoints.down('sm')]:{
            fontSize:'10px'
        }
    },
}))

const HeaderComponent=({toggleDropdown,signOutUser, currentUser, clearLoginError, history, recipeError, clearRecipeError})=>
{
    const classes=useStyles();


const handleClose=()=>{
    clearRecipeError()
}
    return (
   
    <HeaderComponentDiv>
        <Portal>
        <Snackbar open={recipeError!==null} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {recipeError}
        </Alert>
      </Snackbar>
      </Portal>

        <LogoContainer to={'/'}>Recipe Box</LogoContainer>
        <LinksContainerDiv>
            {currentUser ? (
            <div style={{display:'flex', flexDirection:'row'}}>   
            <Button className={classes.headerButton} variant='outlined' size='medium' onClick={()=>history.push('/myrecipebox/myrecipes')}>
                My Recipes
            </Button>
            <Button className={classes.headerButton} variant='outlined' size='medium' onClick={()=>{
                signOutUser();
                }}>
                Sign Out
            </Button>
            </div> ) :
            (<Button className={classes.headerButton} variant='outlined' size='medium' onClick={()=>{toggleDropdown(); clearLoginError()}}>
                Sign In
            </Button>)
            }
        </LinksContainerDiv>
        <SignInDropDown/>
    </HeaderComponentDiv>
)
        }

const mapDispatchToProps=dispatch=>({
    toggleDropdown:()=>dispatch(toggleDropdown()),
    signOutUser:()=>dispatch(signOutStart()),
    clearLoginError:()=>dispatch(clearUserError()),
    clearRecipeError:()=>dispatch(clearRecipeError())
})

const mapStateToProps=createStructuredSelector({
    hidden:selectHiddenSignInModal,
    currentUser:selectCurrentUser,
    recipeError:selectRecipeError
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderComponent))