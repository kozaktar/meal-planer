const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adminUser:iko12345@cluster0.zdb1j.mongodb.net/recipeboxDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    replset: {
        socketOptions: {
            connectTimeoutMS: 300000, // 5 minutes
            keepAlive: 120
        },
        ha: true, // Make sure the high availability checks are on
        haInterval: 10000, // Run every 10 seconds
    }
    
})
