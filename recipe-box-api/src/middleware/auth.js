const User=require('../models/user');

const auth = async (req, res, next) => {
    try {
        const user = await User.findOne({authID: req.authID });

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