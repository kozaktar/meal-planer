import React from 'react';
import './addRecipeForm.scss'
import TextField from '@material-ui/core/TextField';



class AddRecipeForm extends React.Component {
  state = { 'ingredients': ''};

  handleChange = ({target: {name, value}}) => {
    this.setState({...this.state, [name]: value });
  };



  render () {
    return (
     <form className="form">
       <div className="upload-image">
       <input type="file" name="file" id="file" className="inputfile" />
      <label htmlFor="file" className="upload-lable"><i className="fas fa-upload"/><span className="title-text">Upload Pictures...</span></label>
      </div>
      <TextField
        id="outlined-multiline-flexible"
        label="Ingredients"
        multiline
        value={this.state.ingredients}
        name="ingredients"
        onChange={this.handleChange}
        margin="normal"
        variant="outlined"
        rows="8"
        helperText="Enter 1 Ingredient Per Line"
      />
     </form>
    );
  }
}

export default AddRecipeForm;