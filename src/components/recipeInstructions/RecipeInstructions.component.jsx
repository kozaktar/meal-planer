import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

const styles={
    heading:{
        marginTop:'20px',
        marginBottom:'10px'
    },
    instructions:{
        marginLeft:'10px',
        paddingBottom:'40px'
    },
    step:{
        marginBottom:'20px'
    }
}

const RecipeInstructions=({recipeDirections})=>(
    <Fragment>
        <Typography variant="h5" style={styles.heading}>
                        Instructions:
        </Typography>
        <div style={styles.instructions}>
        {
            recipeDirections.map((item, idx)=>
                <div key={idx} style={styles.step}>
                    <Typography variant='h6'>
                        Step {idx+1}:
                    </Typography>
                    <p style={{marginLeft:'10px'}}>
                        {item}
                    </p>
                </div>)
        }
        </div>
    </Fragment>
    
)

export default RecipeInstructions