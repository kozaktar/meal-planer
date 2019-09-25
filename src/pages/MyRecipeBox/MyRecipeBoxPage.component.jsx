import React from 'react';
import {Route} from 'react-router-dom';
import MyRecipiesComponent from '../MyRecipes/MyRecipies.component';

const MyRecipeBoxPage=({match})=>(
    <div className="MyRecipeBoxPage">
        <Route exact path={"/myrecipebox/myrecipes"} component={MyRecipiesComponent}/>
    </div>
)

export default MyRecipeBoxPage;