import React, { Fragment } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import {withRouter} from 'react-router-dom'


const styles={
    header:{
        display:'flex',
        justifyContent:'space-between',
        paddingTop:'1vh',
        paddingBottom:'1vh',
    },
    title:{
        marginLeft:'20px',
        marginTop:'10px'
    }
}

const RecipePageHeader=({children, history})=>(
    <Fragment>
    <div style={styles.header}>
        <Typography variant="h6" style={styles.title}>{children}</Typography>
        <IconButton aria-label="close"  onClick={()=>history.push('/')}>
            <CloseIcon />
        </IconButton>
    </div>
    <Divider style={{marginBottom:'4vh'}}/>
    </Fragment>
)

export default withRouter(RecipePageHeader);