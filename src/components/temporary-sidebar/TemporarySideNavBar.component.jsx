import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListItemLink from '../listItemLink/ListItemLink.component'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import {withRouter} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuItems:{
      marginTop:10
  }
});

function TemporaryDrawer({location}) {
  const classes = useStyles();
  const [drawerOpen, setState] = React.useState(
    false
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const path=location.pathname.split('/')

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  return (
    <div>
        <React.Fragment>
          <IconButton style={matches && path[1] === 'myrecipebox'?{marginLeft:'-25px', marginTop:'-15px'}:{display:'none'}} onClick={toggleDrawer( true)}><MoreVertIcon/></IconButton>
          <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer(false)}>
          <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer( false)}
      onKeyDown={toggleDrawer( false)}
    >
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
    </div>
          </Drawer>
        </React.Fragment>
    </div>
  );
}

export default withRouter(TemporaryDrawer)