const express=require('express');
const Recipe=require('../models/recipe');
const router=new express.Router();
const auth=require('../middleware/auth');
const multer=require('multer');
const removeDuplicates=require('../utils')

//used to handle image file uploads for recipe picture
//only accempts file size up 2mb and only the following formats: jpg|jpeg|gif|bmp|png

const upload = multer(
    {
        limits:{
            fileSize:2000000
        },
        fileFilter(req,file,cb){
            if(!file.originalname.toLowerCase().match(/\.(jpg|jpeg|gif|bmp|png)$/))
              return cb(new Error('file must be an image'))

            cb(undefined, true)
        }

        
    }
);

//create recipe
router.post('/recipes', upload.single('picture'), auth, async (req, res) => {
    let recipe=null
    
    recipe = new Recipe({
        recipeTitle: req.body.recipeTitle,
        recipeIngredients: JSON.parse(req.body.recipeIngredients),
        recipeDirections: JSON.parse(req.body.recipeDirections),
        owner: req.user.authID, //authID obtained from firebase auth api
        visibility: req.body.visibility,
        author: req.body.author,
        recipeDescription: req.body.recipeDescription,
        users: [req.user.authID],
        portions: req.body.portions,
        prepTime: req.body.prepTime
    })
    
    if(req.file){
        recipe.picture=req.file.buffer
    }

    try {
        await recipe.save()
        res.status(201).send(recipe)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

//GET all user's recipes with pagination
// GET /recipes?limit=10&skip=20
//match can be used to filter out reicpes (feature to be implemented later)
router.get('/recipes/', auth, async (req, res) => {
    //const limit=parseInt(req.query.limit)
    const limit=parseInt(req.query.limit)
    

    try {
        const UserRecipes= await Recipe.find({users: req.user.authID}).sort({_id:1}).skip(req.query.skip).limit(limit)
        res.status(201).send(UserRecipes)
    } catch (e) {
        res.status(500).send(e)
    }
})

//get public recipes
//eg GET /recipes/public?limit=10
router.get('/recipes/public/featured', async (req, res) => {
    const limit=parseInt(req.query.limit)

    try {
        let publicRecipes= await Recipe.aggregate([{$match: {visibility:'public'}}, {$sample: {size: limit}}, {$project: {_id: 1}}])
        publicRecipes=publicRecipes.map(item=>item._id)
        const response=await Recipe.find({'_id': {'$in':publicRecipes}})
        res.status(201).send(response)
    } catch (e) {
        res.status(500).send(e)
    }
})

//send all user's recipe titles for search
router.get('/recipes/mytitles', auth, async (req, res) => {
    try {
      const titles= await Recipe.find({users: req.user.authID}, {recipeTitle: 1})
        res.send(titles)
    } catch (e) {
        res.status(500).send(e)
    }
})

//send all public recipe titles
router.get('/recipes/titles', async (req, res) => {

    try {
      const titles= await Recipe.find({visibility:'public'}, {recipeTitle: 1})
        res.send(titles)
    } catch (e) {
        res.status(500).send(e)
    }
})


router.get('/recipes/id/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const recipe = await Recipe.findOne({ _id })

        if (!recipe) {
            return res.status(404).send()
        }

        res.status(201).send(recipe)
    } catch (e) {
        res.status(500).send()
    }
})

// GET /recipes/search?type=public&term=searchTerm
router.get('/recipes/search/', async (req, res) => {
    console.log('search!!!!')
    const term = req.query.term //search term
    const type = req.query.type //search type public vs loged in user
    console.log(term)
    console.log(type)
    console.log(req.header('userID'))
    const searchTerm = new RegExp(`\\b${term}\\b`,'i');
    let recipe =null
    if(req.header('userID')){
        try {
            type==='private'?
                recipe = await Recipe.find({ recipeTitle: {"$regex": searchTerm}, users: req.header('userID') }):
                recipe = await Recipe.find({ recipeTitle: {"$regex": searchTerm}, visibility: 'public' })

            if (recipe.length<1) {
                recipe=['No recipes found']
            }
    
            res.send(recipe)
        } catch (e) {
            res.status(500).send()
        }
    }
    
})

router.patch('/recipes/:id', upload.single('picture'), auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['recipeTitle', 'recipeIngredients', 'recipeDirections', 'visibility', 'picture', 'recipeDescription', 'portions', 'prepTime', 'users']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const recipe = await Recipe.findOne({ _id: req.params.id})

        if (!recipe) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            if(update==='recipeIngredients' || update==='recipeDirections' || update==='users'){
                recipe[update] = JSON.parse(req.body[update])
            
            }
            else
                recipe[update] = req.body[update]
        })

        if(req.body.picture==='null'){
            recipe.picture=undefined
        }
        else if(req.file){
            recipe.picture=req.file.buffer
        }
        
        await recipe.save()
        res.send(recipe)
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }
})

router.delete('/recipes/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id})
        if(recipe.users.length<2){
            await Recipe.deleteOne({ _id: req.params.id})
        }
        else{
            await Recipe.updateOne({_id: req.params.id}, {$pull:{users: req.user.authID}})

        }

        if (!recipe) {
            res.status(404).send()
        }

        res.send(recipe._id)
    } catch (e) {
        res.status(500).send()
    }
})





// router.post('/imageUpload', upload.single('upload'), async (req,res)=>{
//     req.recipe.picture = req.file.buffer
//     await req.recipe.save()
//     res.send()
// }, (error, req, res, next)=>{
//     res.status(400).send({error: error.message })
// });

module.exports = router