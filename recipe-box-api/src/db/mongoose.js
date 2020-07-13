const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adminUser:iko12345@cluster0.zdb1j.mongodb.net/recipeboxDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    
})
