const express = require('express');
const router = express.Router();
const Tank = require("../models/product")
const mongoose = require("mongoose")
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload/')
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString + file.originalname)
    }
})

const upload = multer({storage:storage})

router.get('/', (req, res, next) => {
       Tank.find()
       .select('_id, name , price')
       .exec()
       .then(docs => {
     const response = {
         count : docs.length,
         products : docs.map(doc =>{
             return {
                 _id: doc._id,
                 name: doc.name,
                 price: doc.price,
                 request: {
                     type: 'GET',
                     url: 'http://localhost:3000/product/' + doc._id
                 }
             }
         })
     }
           res.status(200).json(response);
       }).catch(err => {
           console.log(err);
           res.status(500).json({
               error:err
           })
       })
  
}); 

router.post('/',upload.single("productimage"), (req, res, next) => {
    console.log(req.file);
    const product = new Tank({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:'Product Created Succesfully',
            createproduct:{
                name : result.name,
                price:result.price
            }
        });
    })
    .catch(err=>{
     res.status(500).json({
         error:err
     })
})
})

router.get('/:productid', (req, res, next) => {
    const id = req.params.productid;
    Tank.findById(id).exec().then(doc =>{
        console.log(doc)
        if(doc){
        res.status(200).json(doc)}
        else{
            res.status(404).json({message: "please enter valid id"})
        }
    })
    .catch(err =>{
        res.status(500).json({error: err});
        })
    })


router.delete('/productid', (req, res, next) => {
const id = req.params.productid;
 Tank.remove(id).exec().then(result =>{
     console.log(result);
     res.status(200).json(result)
 }).catch(err => {
     console.log(err)
     res.status(500).json({
         error: err
     })
 })
}); 

router.patch('/productid', (req, res, next) => {
    res.status(200).json({
        message:'product updated'
    });
}); 
      
module.exports = router;