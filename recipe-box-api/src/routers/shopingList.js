const express=require('express');
const ShopingList=require('../models/shopingList');
const router=new express.Router();
const auth=require('../middleware/auth');

router.get('/shoping-list', auth, async (req, res) => {
    try{
    const shopingList = await ShopingList.findOne({ owner: req.user.authID})
    console.log('shopping list: ', shopingList)

    if (!shopingList) {
        shopingList=new ShopingList({
            shopingList:[], //for now just creates an empty shopping list
            owner: req.user.authID
        })
        await shopingList.save()
        res.status(201).send()
    }
    else{
    
    res.status(201).send(shopingList.ShopingList)
    }

} catch (e) {
    res.status(500).send(e)
}
})

router.patch('/shoping-list', auth, async (req, res) => {
    const updatedShopingList=JSON.parse(req.body.shopingList)
    
    try {
        const shopingList = await ShopingList.findOne({ owner: req.user.authID})

        
        shopingList.list=updatedShopingList

        await shopingList.save()
        res.status().send()
        

    } catch (e) {
        res.status(400).send(e)
    }

})

module.exports = router