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
    width: 500,
  },
  noMargin:{
      margin:0
  }
}));

 const RecipeInputTabs=({onFormChange})=> {
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
          variant="fullWidth"
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
            <Input onChange={onFormChange} fullWidth id='title' style={{
                marginBottom:30
            }}/>
            <InputLabel>Description</InputLabel>
        <TextField
          fullWidth
          id="description"
          multiline
          rows="4"
          margin="normal"
        />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <InputLabel>Ingredients</InputLabel>
            <TextField
            fullWidth
            id="ingredients"
            multiline
            rows="8"
            margin="normal"
            />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <InputLabel>Directions</InputLabel>
            <TextField
            fullWidth
            id="directions"
            multiline
            rows="8"
            margin="normal"
            />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
export default RecipeInputTabs;