import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';


class IngredientList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ingredients:this.props.ingredients
        }
    }

    render(){
        {console.log(this.props)}
        return(
    <ul>
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