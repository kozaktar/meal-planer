const mongoose = require('mongoose');

const shopingListSchema=new mongoose.Schema({
    list:[{
        type: String,
        required: true
    }],
    owner:{
        type: String,
        required: true,
        ref:'User'
    }
})

const ShopingList=mongoose.model('ShopingList',shopingListSchema);

module.exports=ShopingList;