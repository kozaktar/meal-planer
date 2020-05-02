const express=require('express');
require('./db/mongoose');
const userRout=require('./routers/user');
const recipeRout=require('./routers/recipe');
const shopingListRout=require('./routers/shopingList')
const cors = require('cors');

const app=express();
const port= process.env.port || 3001;

app.use(express.json());
app.use(cors());
app.use(userRout);
app.use(recipeRout);
app.use(shopingListRout);
// app.use(recipePictureRoute);



app.listen(port, ()=>{
    console.log("Server is running!")
})

