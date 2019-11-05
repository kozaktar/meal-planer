import React from 'react';
import SearchBar from '../../components/search-bar/SearchBar.component'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from '../../components/modal/modal.component';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddRecipeForm from '../../components/add-recipe-form/addRecipeForm.component'




const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  alignItemsAndJustifyContent: {
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));

const MyRecipies =()=>{
    
const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

const classes=useStyles();

return(
  <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.alignItemsAndJustifyContent}>
          <SearchBar/>
        </Grid>
        <Grid item xs>
        <Modal title="Add New Recipe" handleClose={handleClose} open={open}>
          <AddRecipeForm onClose={handleClose}/>
      </Modal>
    <Fab size="medium" color="secondary" aria-label="add" onClick={handleOpen}>

          <AddIcon />
        </Fab>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
  </div>
        )
    
}

export default MyRecipies;