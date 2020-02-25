import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';

const spinerStyle={
    margin: 'auto'
}

const WithSpinner=WrappedComponent=>({isLoading, ...otherProps})=>{
    console.log('isLoading',isLoading)
    return isLoading ? <CircularProgress style={spinerStyle}/>:
    <WrappedComponent {...otherProps}/>
}

export default WithSpinner