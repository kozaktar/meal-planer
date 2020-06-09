import React from 'react';
import {HeaderComponentDiv, LinksContainerDiv, OptionLink, LogoContainer} from './header.styles';
import {connect} from 'react-redux';
import {toggleDropdown} from '../../redux/sign-in-modal/sign-in-modal.actions';
import SignInDropDown from '../Sign-In-DropDown/signInDropDown.component';
import {selectHiddenSignInModal} from '../../redux/sign-in-modal/sign-in-modal.selector';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {signOutStart, clearUserError} from '../../redux/user/user.actions'
import {createStructuredSelector} from 'reselect';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
    }
}))

const HeaderComponent=({toggleDropdown,signOutUser, currentUser, clearLoginError})=>
{
    const classes=useStyles();
    return (
   
    <HeaderComponentDiv>
        <LogoContainer to={'/'}>Recipe Box</LogoContainer>
        <LinksContainerDiv>
            {currentUser ? (
            <div style={{display:'flex', flexDirection:'row'}}>   
            <Button className={classes.headerButton} variant='outlined' size='small' href="/myrecipebox/myrecipes">
                My Recipes
            </Button>
            <Button className={classes.headerButton} variant='outlined' size='small' onClick={()=>{
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
    clearLoginError:()=>dispatch(clearUserError())
})

const mapStateToProps=createStructuredSelector({
    hidden:selectHiddenSignInModal,
    currentUser:selectCurrentUser
});
export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent)