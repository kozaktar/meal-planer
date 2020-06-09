import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectUserLoading, selectCurrentUser} from '../../redux/user/user.selectors';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Redirect} from 'react-router-dom';

const AuthPage=({loading, currentUser})=>{
    if(loading)
        return <CircularProgress style={{position: 'fixed', top: '50%', left: '50%',}}/>
    else if(currentUser)
        return <Redirect to='/myrecipebox/myrecipes'/>
    else return <Redirect to='/'/>

}

const mapStateToProps=createStructuredSelector(
    {
        loading:selectUserLoading,
        currentUser:selectCurrentUser
    }
)

export default connect(mapStateToProps)(AuthPage)