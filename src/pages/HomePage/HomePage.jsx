import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../../components/search-bar/SearchBar.component';
import FeaturedRecipesPanel from '../../components/featured-recipes/FeaturedRecipesPanel.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDisplayLoading, selectFetchingRecipeTitles} from '../../redux/recipes/recipes.selectors'



const useStyles=makeStyles(theme=>({
    SearchBar:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:50,
        flexDirection:'column'
    },
    FeaturedRecipes:{
        marginTop:30,
        paddingLeft:'4vw',
        height:'73.5vh',
        maxWidth:'95vw'
    }

}))

const HomePage=({loadingTitles, loading})=>{
    const classes=useStyles()

    return (
        <div>
            <div className={classes.SearchBar}>
                <SearchBar isloading={loadingTitles} type='public'/>
            </div>
            <div className={classes.FeaturedRecipes}>
                <FeaturedRecipesPanel/>
            </div>
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    loading: selectDisplayLoading,
    loadingTitles: selectFetchingRecipeTitles
})

export default connect(mapStateToProps)(HomePage)