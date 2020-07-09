const User=require('../models/user');

//ensures that the user is loged in and authernticated before they can perform any CRUD operation on the databse
const auth = async (req, res, next) => {
    console.log('userID',req.header('userID'))
    try {        
        const user = await User.findOne({authID: req.header('userID') });
        const users = await User.find({authID:".*" });
        console.log(user)
        if (!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth