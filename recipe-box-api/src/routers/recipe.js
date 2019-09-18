const express=require('express');
const Recipe=require('../models/recipe');
const router=new express.Router();
const auth=require('../middleware/auth');

//create recipe
router.post('/recipes', auth, async (req, res) => {
    const recipe = new Recipe({
        ...req.body,
        owner: req.user.authID //authID obtained from firebase auth api
    })

    try {
        await recipe.save()
        res.status(201).send(recipe)
    } catch (e) {
        res.status(400).send(e)
    }
})

//GET all user's recipes with pagination
// GET /recipes?limit=10&skip=20
//match can be used to filter out reicpes (feature to be implemented later)
router.get('/recipes', auth, async (req, res) => {
    const match = {}

    try {
        await req.user.populate({
            path: 'recipes',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
            }
        }).execPopulate()
        res.send(req.user.recipes)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/recipes/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const recipe = await Recipe.findOne({ _id, owner: req.user.authID })

        if (!recipe) {
            return res.status(404).send()
        }

        res.send(recipe)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/recipes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['recipeTitle', 'recipeIngredients', 'recipeDirections', 'visibility']
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
        await recipe.save()
        res.send(recipe)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/recipe/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!recipe) {
            res.status(404).send()
        }

        res.send(recipe)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router