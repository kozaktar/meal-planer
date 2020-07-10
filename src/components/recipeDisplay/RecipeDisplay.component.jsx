import React from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import { selectSearchResults, selectSearchQuery } from '../../redux/recipes/recipes.selectors';
import RecipeCard from '../recipe-card/RecipeCard';
import { createStructuredSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import {clearSearchQuery} from '../../redux/recipes/recipes.actions';

const useStyles = makeStyles(theme => ({
    notFoundTxt:{
        marginLeft:-250,
        marginTop:80
    },
    searchHeading:{
        textAlign:'left',
        marginLeft:10,
        marginTop:10,
        marginBottom:30,
        fontSize:22,
        [theme.breakpoints.down('sm')]:{
            marginLeft:10
        }
    },
    queryString:{
       color:'grey',
       fontStyle:'italic',
       fontSize:20,
       marginLeft:10
    },
    cancelButton:{
        fontSize:'small'
    }
      
  }));

const RecipeDisplay=({recipes, searchResults, queryObject, clearQuery, title})=>{

    const classes=useStyles();
    const queryString=queryObject.term

    if(searchResults.length>0){
        if(searchResults[0]==='No recipes found')
            return(
            <> 
            <div className={classes.searchHeading}>Search results for: 
                        <span className={classes.queryString} >{queryString}</span>
                        <IconButton size='small' onClick={clearQuery}>
                            <CancelIcon fontSize='small'/>
                        </IconButton>
            </div>
            <Typography className={classes.notFoundTxt} variant='h6'>No recipes found</Typography>
            </>)
        else
            return ( 
                   <div>
                       <div className={classes.searchHeading}>Search results for: 
                        <span className={classes.queryString} >{queryString}</span>
                        <IconButton size='small' onClick={clearQuery}>
                            <CancelIcon fontSize='small'/>
                        </IconButton>
                       </div>
                    <Grid container spacing={2}>
                       {searchResults.map(item=>(<Grid item key={item._id}>
                    <RecipeCard recipe={item}/>
                     </Grid>) 
                     )}
                    </Grid>
                   </div>
               )
    }
    else
        return (<>
        {title?<Typography variant='h5' style={{marginBottom:30}}>{title}</Typography>:null}
        <Grid container spacing={2}>
            {recipes.map(item=>(<Grid item key={item._id}>
            <RecipeCard recipe={item}/>
          </Grid>))}
          </Grid>
          </>)

}

const mapStateToProps=createStructuredSelector({
    searchResults: selectSearchResults,
    queryObject: selectSearchQuery
})

const mapDispatchToProps=dispatch=>(
    {
        clearQuery: ()=>dispatch(clearSearchQuery())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDisplay)