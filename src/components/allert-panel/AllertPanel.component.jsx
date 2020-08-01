import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'; 

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const AllertPanel=({severity, message, open, handleClose})=>{

      return (<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>);
      
}

export default AllertPanel;