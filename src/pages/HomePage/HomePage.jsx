import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from '../../assets/background.jpg';
import SearchBar from '../../components/search-bar/SearchBar.component';
import FeaturedRecipesPanel from '../../components/featured-recipes/FeaturedRecipesPanel.component';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectRecipeLoading} from '../../redux/recipes/recipes.selectors'

const useStyles=makeStyles(theme=>({
    background:{
        backgroundImage:`url(${BackgroundImage})`,
        backgroundPosition:'center center',
        backgroundSize:'cover',
        height:'100%',
    },
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

const HomePage=({loading})=>{
    const classes=useStyles()

    return (
        <div className={classes.background}>
            <div className={classes.SearchBar}>
                <SearchBar/>
            </div>
            <div className={classes.FeaturedRecipes}>
                <FeaturedRecipesPanel/>
            </div>
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    loading: selectRecipeLoading
})

export default connect(mapStateToProps)(HomePage)