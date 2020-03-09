import React from 'react';
import {Route} from 'react-router-dom';
import MyRecipiesComponent from '../MyRecipes/MyRecipies.component';
import SideNavBar from '../../components/side-nav-bar/SideNavBar.component';
import Container from '@material-ui/core/Container';


const styles={
    flex:{
        display:'flex',
    },
    fullPage:{
        
        // overflow:'hidden',
        marginLeft:'-30px',
        //position: 'absolute',
       // left:60
    }
}

const MyRecipeBoxPage=()=>(
    <Container>
      <SideNavBar/>
    <div style={styles.fullPage}>
        <Route exact path={"/myrecipebox/myrecipes"} component={MyRecipiesComponent}/>
        <Route exact path={"/myrecipebox/mygrocerylist"} component={'hello'}/>
    </div>
    </Container>
)

export default MyRecipeBoxPage;