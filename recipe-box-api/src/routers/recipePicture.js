const express=require('express');
const auth=require('../middleware/auth');
const router=new express.Router();

const multer=require('multer');

const upload = multer(
    {
        dest: 'recipeImages',
        limits:{
            fileSize:2000000
        },
        fileFilter(req,file,cb){
            if(!file.originalname.match(/\.(jpg|jpeg|gif|bmp|png)$/))
              return cb(new Error('file must be an image'))

            cb(undefined, true)
        }

        
    }
);

router.post('/imageUpload', upload.single('upload'), (req,res)=>{
    res.send("upload successful")
}, (error, req, res, next)=>{
    res.status(400).send({error: error.message })
});

module.exports=router;