const express=require('express');
const Recipe=require('../models/recipe');
const router=new express.Router();
const auth=require('../middleware/auth');
const multer=require('multer');

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
    console.log('body:',req.body)

    
    recipe = new Recipe({
        recipeTitle: req.body.recipeTitle,
        recipeIngredients: JSON.parse(req.body.recipeIngredients),
        recipeDirections: JSON.parse(req.body.recipeDirections),
        owner: req.user.authID, //authID obtained from firebase auth api
        visibility: req.body.visibility,
        author: req.body.author,
        recipeDescription: req.body.recipeDescription,
        users: [req.user.authID]
    })
    
    if(req.file){
        recipe.picture=req.file.buffer
    }

    try {
        await recipe.save()
        res.status(201).send(recipe)
    } catch (e) {
        res.status(400).send(e)
        console.log(e);
    }
})

//GET all user's recipes with pagination
// GET /recipes?limit=10&skip=20
//match can be used to filter out reicpes (feature to be implemented later)
router.get('/recipes/', auth, async (req, res) => {
    console.log("user", req.user)
    const match = {}
    //const limit=parseInt(req.query.limit)
    const limit=parseInt(req.query.limit)
    

    try {
        const UserRecipes= await Recipe.find({users: req.user.authID}).sort({_id:1}).skip(req.query.skip).limit(limit)
        console.log('user-->',req.user)

        console.log('Recipes sending:', UserRecipes)
        res.status(201).send(UserRecipes)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

//send all user's recipe titles for search
router.get('/recipes/mytitles', auth, async (req, res) => {

    try {
      const titles= await Recipe.find({owner: req.user.authID}, {recipeTitle: 1})
        console.log('titles:', titles)
        res.send(titles)
    } catch (e) {
        res.status(500).send()
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

router.get('/recipes/search/:term', async (req, res) => {
    const term = req.params.term
    const searchTerm = new RegExp(`\\b${term}\\b`,'i');
    console.log('searchTerm:', searchTerm)
    if(req.header('userID')){
        try {
            let recipe = await Recipe.find({ recipeTitle: {"$regex": searchTerm}, users: req.header('userID') })
            if (recipe.length<1) {
                recipe=['No recipes found']
            }
    
            res.send(recipe)
        } catch (e) {
            console.log(e)
            res.status(500).send()
        }
    }
    
})

router.patch('/recipes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['recipeTitle', 'recipeIngredients', 'recipeDirections', 'visibility', 'picture']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, owner: req.user.authID})

        if (!recipe) {
            return res.status(404).send()
        }

        updates.forEach((update) => recipe[update] = req.body[update])

        if(req.file){
            recipe.picture=req.file.buffer
        }
        await recipe.save()
        res.send(recipe)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/recipes/:id', auth, async (req, res) => {
    console.log('delete request')
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