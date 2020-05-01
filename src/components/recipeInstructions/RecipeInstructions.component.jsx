import React from 'react';
import Typography from '@material-ui/core/Typography';

const RecipeInstructions=({recipeDirections})=>(
    <div>
        {
            recipeDirections.map((item, idx)=>
                <div key={idx}>
                    <Typography variant='h6'>
                        Step {idx+1}:
                    </Typography>
                    <p>
                        {item}
                    </p>
                </div>)
        }
    </div>
    
)

export default RecipeInstructions