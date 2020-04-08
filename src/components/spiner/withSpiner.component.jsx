import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const spinerStyle={
  position: 'fixed', /* or absolute */
  top: '50%',
  left: '50%',
}

const WithSpinner=WrappedComponent=>({isloading, ...otherProps})=>{
    return isloading ? <CircularProgress style={spinerStyle}/>:
    <WrappedComponent {...otherProps}/>
}


export default WithSpinner