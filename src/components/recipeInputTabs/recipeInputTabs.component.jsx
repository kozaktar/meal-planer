import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import RecipeDirectionsInput from '../recipe-directions-input/RecipeDirectionsInput.component';
import Button from '@material-ui/core/Button';
import RecipeIngredientInput from '../recipe-ingredients-input/RecipeIngredientsInput.component';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 500,
    heigh:'100%'
  },
  noMargin:{
      margin:0
  },
  margin:{
     marginBottom: 100
  }
}));

 const RecipeInputTabs=({onFormChange, state, addDirections, deleteDirections, deleteIngredient, addIngredient})=> {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          aria-label="Add new recipe dialog input"
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Ingredients" {...a11yProps(1)} />
          <Tab label="Directions" {...a11yProps(2)} />
        </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <InputLabel>Title</InputLabel>
            <Input onChange={onFormChange} fullWidth name='title' value={state.title} style={{
                marginBottom:30
            }}/>
        <InputLabel>Description</InputLabel>
        <TextField
          fullWidth
          name='description'
          onChange={onFormChange}
          value={state.description}
          multiline
          rows="2"
          margin="normal"
        />
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:30}}>
        <div>
        <InputLabel>Portions</InputLabel>
        <TextField
          type='Number'
          name='portions'
          onChange={onFormChange}
          value={state.portions}
          margin="normal"
          style={{marginRight:10}}
        />
         </div>
         <div>
         <InputLabel>Preparation Time</InputLabel>
         <TextField
          name='prepTime'
          onChange={onFormChange}
          value={state.prepTime}
          margin="normal"
        />
        </div>
        </div>
        <FormControl component="fieldset">
        <RadioGroup row aria-label="position" style={{marginTop:10}} onChange={onFormChange} name='visibility' value={state.visibility}>
        <FormControlLabel
          value='private'
          control={<Radio color="primary" />}
          label={<Tooltip title="private recipes are only visible to you"><Typography>Private</Typography></Tooltip>}
          labelPlacement="start"
        />
        <FormControlLabel
          value='public'
          control={<Radio color="primary" />}
          label={<Tooltip title="public recipes are visible to all users"><Typography>Public</Typography></Tooltip>}
          labelPlacement="start"
        />
        </RadioGroup>
        </FormControl>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            {state.ingredients.map((ingredient, index)=>
                <RecipeIngredientInput idx={index} handleChange={onFormChange} key={`ingredient-${index}`} deleteIngredient={deleteIngredient} state={state}/>)}
        <Button variant="outlined" size="small" color="primary" onClick={addIngredient}>
          + Ingredients
        </Button>    
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            {state.directions.map((direction, index)=>
                <RecipeDirectionsInput idx={index} handleChange={onFormChange} key={`directions-${index}`} deleteDirections={deleteDirections} state={state}/>)}
        <Button variant="outlined" size="small" color="primary" onClick={addDirections}>
          + Step
        </Button>    
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
export default RecipeInputTabs;