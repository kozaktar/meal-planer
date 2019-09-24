const express=require('express');
require('./db/mongoose');
const userRout=require('./routers/user');
const recipeRout=require('./routers/recipe');
var cors = require('cors');

const app=express();
const port= process.env.port || 3001;

app.use(express.json());
app.use(cors());
app.use(userRout);
app.use(recipeRout);


app.listen(port, ()=>{
    console.log("Server is running!")
})

