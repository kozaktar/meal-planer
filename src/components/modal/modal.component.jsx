import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from './dialogTitle.component';
import Divider from '@material-ui/core/Divider';

const styles={
    backgroundColod:'red'
}
const Modal=({open, handleClose, title, size, children})=>(
    <Fragment>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='lg'>
    <DialogTitle onClose={handleClose}>{title}</DialogTitle>
    <Divider/>
    {children}
    </Dialog>
    </Fragment>
)

export default Modal;