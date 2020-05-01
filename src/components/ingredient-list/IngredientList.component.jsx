import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const styles={
    list:{
        listStyleType:'none',
        columnCount:'2',
        columnWidth:'200px'
    }
}

class IngredientList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ingredients:this.props.ingredients
        }
    }

    render(){
        return(
    <ul style={styles.list}>
        {this.props.ingredients.map((ingredient, idx)=>(
        <li key={idx}>
            <IconButton>
                <AddCircleIcon/>
            </IconButton>
            {ingredient}
        </li>))}
    </ul>
        )
    }
    
}

export default IngredientList