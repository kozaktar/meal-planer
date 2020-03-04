import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const spinerStyle={
    margin: 'auto'
}

const WithSpinner=WrappedComponent=>({isloading, ...otherProps})=>{
    console.log('isLoading',isloading)
    return isloading ? <CircularProgress style={spinerStyle}/>:
    <WrappedComponent {...otherProps}/>
}


export default WithSpinner