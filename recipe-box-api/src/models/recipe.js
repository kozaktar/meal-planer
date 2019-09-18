const mongoose = require('mongoose');


const recipeSchema=new mongoose.Schema({
    recipeTitle:{
        type: String,
        required: true,
        trim: true
    },
    recipeIngredients:{
        type: Array,
        required: true
    },
    recipeDirections:{
        type: String,
        required: true,
    },
    owner:{
        type: String,
        required: true,
        ref:'User'
    },
    visibility:{
        type: String,
        required: true,
    }
})

const Recipe=mongoose.model('Recipe', recipeSchema);

module.exports =Recipe;
