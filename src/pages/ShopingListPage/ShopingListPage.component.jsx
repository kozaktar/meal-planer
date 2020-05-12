import React from 'react';
import ShopingList from '../../components/shoping-list/ShopingList.component'
import Container from '@material-ui/core/Container'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const styles=makeStyles(
    {
    paper:{
        height:'91vh',
        padding:'20px'
    },
    title:{
        textAlign:'center',
        },
})

const ShopingListPage=()=>{
    const classes=styles();

    return (
    <Container>
        <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.title}>Shoping List</Typography>
        <ShopingList/>
        </Paper>
    </Container>
)}

export default ShopingListPage;