import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from '../../assets/background.jpg';
import SearchBar from '../../components/search-bar/SearchBar.component';
import FeaturedRecipesPanel from '../../components/featured-recipes/FeaturedRecipesPanel.component';

const useStyles=makeStyles(theme=>({
    background:{
        background:`#ffffff url(${BackgroundImage}) no-repeat center center`,
        backgroundSize:'cover',
        height:'91vh',
    },
    SearchBar:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:50,
    }

}))

const HomePage=()=>{
    const classes=useStyles()

    return (
        <div className={classes.background}>
            <div className={classes.SearchBar}>
                <SearchBar/>
                <FeaturedRecipesPanel/>
            </div>
        </div>
    )
}

export default HomePage