const express=require('express');
const ShopingList=require('../models/shopingList');
const router=new express.Router();
const auth=require('../middleware/auth');

router.patch('/shoping-list', auth, async (req, res) => {
    const updatedShopingList=JSON.parse(req.body.shopingList)
    
    try {
        const shopingList = await ShopingList.findOne({ owner: req.user.authID})

        if (!shopingList) {
            shopingList=new ShopingList({
                shopingList:[...updatedShopingList], //for now just creates an empty shopping list
                owner: req.user.authID
            })
            await shopingList.save()
            res.status(201).send()
        }
        else{
        shopingList.list=updatedShopingList

        await shopingList.save()
        res.status(201).send()
        }

    } catch (e) {
        res.status(400).send(e)
    }

})

module.exports = router