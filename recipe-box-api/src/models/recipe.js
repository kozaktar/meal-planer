const mongoose = require('mongoose');


const recipeSchema=new mongoose.Schema({
    recipeTitle:{
        type: String,
        required: true,
        trim: true
    },
    recipeDescription:{
        type: String,
        required: true
    },
    portions:{
        type: Number,
        required:true
    },
    prepTime:{
        type: String,
        required:true
    },
    recipeIngredients:[{
        type: String,
        required: true
    }],
    recipeDirections:[{
        type: String,
        required: true,
    }],
    owner:{
        type: String,
        required: true,
    },
    visibility:{
        type: String,
        required: true,
    },
    picture:{
        type:Buffer
    },
    author:{
        type: String,
        required: true
    },
    users:[{
        type: String,
        required: true
    }]
})

const Recipe=mongoose.model('Recipe', recipeSchema);

module.exports =Recipe;
