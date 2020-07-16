import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const spinerStyle={
  position: 'fixed', /* or absolute */
  top: '50%',
  left: '50%',
  zIndex:999
}

const WithSpinner=WrappedComponent=>({isloading, styles, ...otherProps})=>{
  console.log('spinner style:', styles)
    return isloading ? <CircularProgress style={styles?styles:spinerStyle}/>:
    <WrappedComponent {...otherProps}/>
}


export default WithSpinner