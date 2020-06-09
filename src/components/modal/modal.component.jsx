import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from './dialogTitle.component';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const Modal=({open, handleClose, title, children})=>{
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
    <Fragment>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='lg' fullScreen={fullScreen}>
    <DialogTitle onClose={handleClose}>{title}</DialogTitle>
    <Divider/>
    {children}
    </Dialog>
    </Fragment>
)}

export default Modal;