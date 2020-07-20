import React, { Fragment } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'
import {selectCurrentUser} from '../../redux/user/user.selectors';
import { makeStyles } from '@material-ui/core/styles';


const useStyles=makeStyles(theme=>({
    header:{
        paddingTop:'10px',
        paddingBottom:'10px',
        display:'flex',
        justifyContent:'space-between',
        
    },
    title:{
        marginBottom:'10px'
    },
    noHover:{
        background:'none',
        '&:hover':{
            background:'none',
            color:'black'
        }
    }
}))

const RecipePageHeader=({children, history, currentUser})=>{
    const classes=useStyles();

    return(
    <Fragment>
    <div className={classes.header}>
        {/* Recipe title */}
        <Typography variant="h4">{children}</Typography> 
        {/* on close return to main page --loged in users will be automatically redirected to their recipe page */}
        <IconButton aria-label="close" className={classes.noHover} onClick={()=>{currentUser===null?history.push('/'):history.goBack()}}> 
            <CloseIcon />
        </IconButton>
    </div>
    <Divider style={{marginBottom:'4vh'}}/>
    </Fragment>
    )
}

const mapStateToProps=createStructuredSelector(
    {
        currentUser: selectCurrentUser
    }
)

export default connect(mapStateToProps)(withRouter(RecipePageHeader));