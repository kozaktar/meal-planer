import React from 'react';
import Container from '@material-ui/core/Container';
import RecipePageHeader from './RecipePageHeader.component';


const RecipePage=()=>{
    return(
        <Container>
            <RecipePageHeader>Recipe Title</RecipePageHeader>
            <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe quibusdam accusantium eum, magnam molestiae iure expedita ea odio obcaecati, voluptatibus, esse assumenda. Odit vel nesciunt mollitia, sunt alias autem fugit.</div>
        </Container>
    )
}

export default RecipePage