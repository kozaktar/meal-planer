import React, { Fragment } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'
import {selectCurrentUser} from '../../redux/user/user.selectors'


const styles={
    header:{
        display:'flex',
        justifyContent:'space-between',
        paddingTop:'1vh',
    },
    title:{
        marginTop:'10px'
    }
}

const RecipePageHeader=({children, history, currentUser})=>(
    <Fragment>
    <div style={styles.header}>
        {/* Recipe title */}
        <Typography variant="h4" style={styles.title}>{children}</Typography> 
        {/* on close return to main page --loged in users will be automatically redirected to their recipe page */}
        <IconButton aria-label="close"  onClick={()=>{currentUser===null?history.push('/'):history.goBack()}}> 
            <CloseIcon />
        </IconButton>
    </div>
    <Divider style={{marginBottom:'4vh'}}/>
    </Fragment>
)

const mapStateToProps=createStructuredSelector(
    {
        currentUser: selectCurrentUser
    }
)

export default connect(mapStateToProps)(withRouter(RecipePageHeader));