import react from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const WithSpinner=WrappedComponent=>({isLoading, ...otherProps})=>{
    return isLoading ? <CircularProgress/>:
    <WrappedComponent {...otherProps}/>
}

export default WithSpinner