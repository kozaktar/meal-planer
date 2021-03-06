const express=require('express');
const User=require('../models/user');

const router=new express.Router;

router.post('/users', async (req, res) => {
    console.log(req.body)
    const user = new User(req.body);

    try {
        await user.save()
        res.status(201).send({ user })
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users/:id', async (req, res)=>{
    const userId=req.params.id;

    try{
    const foundUser= await User.findOne({
        authID: userId
    })
    res.status(200).send(foundUser);
    }
    catch (e) {
        res.status(400).send(e)
    }
})

module.exports=router;

