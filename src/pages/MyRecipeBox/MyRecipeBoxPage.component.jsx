import React from 'react';
import {Route} from 'react-router-dom';
import MyRecipiesComponent from '../MyRecipes/MyRecipies.component';
import SideBar from '../../components/sidebar/Sidebar.component';
import SideNavBar from '../../components/side-nav-bar/SideNavBar.component';

const styles={
    flex:{
        display:'flex',
    },
    fullPage:{
        width:'95%',
        overflow:'hidden',
        margin:20,
        position: 'absolute',
        left:60
    }
}

const MyRecipeBoxPage=()=>(
    <div style={styles.flex}>
      <SideNavBar/>
    <div style={styles.fullPage}>
        <Route exact path={"/myrecipebox/myrecipes"} component={MyRecipiesComponent}/>
        <Route exact path={"/myrecipebox/mygrocerylist"} component={MyRecipiesComponent}/>
    </div>
    </div>
)

export default MyRecipeBoxPage;