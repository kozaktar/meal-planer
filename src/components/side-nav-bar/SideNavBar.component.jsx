import React from 'react';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import {withRouter} from 'react-router-dom';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListItemLink from '../listItemLink/ListItemLink.component'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';



const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    }
    
  },
  menuItems:{
      marginTop:75
        
    },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
}));

const SideNavBar=({location})=> {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        onMouseEnter={matches?handleDrawerOpen:null}
        onMouseLeave={matches?handleDrawerClose:null}
        variant={matches?'permanent':'temporary'}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <Divider />
        <List className={classes.menuItems}>
            <ListItemLink 
            icon={<FastfoodIcon/>} 
            primary='Recipes' 
            to='/myrecipebox/myrecipes' 
            selected={location.pathname==="/myrecipebox/myrecipes"}/>
            <ListItemLink 
            icon={<ListAltIcon/>}
            primary='Shopping List'
            to='/myrecipebox/mygrocerylist'
             selected={location.pathname==="/myrecipebox/mygrocerylist"}/>
        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(SideNavBar);