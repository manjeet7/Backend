const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const Mail = require('../models/order');




router.get('/', (req, res, next) => {
   Mail.find()
   .select('product quantity _id')
   .populate("product","name")
   .exec()
   .then(doc =>{
       res.status(200).json({
        count : doc.length,
        orders : doc.map(doc =>{
            return {
                _id : doc._id,
             product: doc.product,
             quantity: doc.quantity,
             request:{
                 type: 'GET',
                 url: 'http://localhost:3000/order/'+doc._id
             }
            }
        })
       });
       })
   .catch(err =>{
       res.status(500).json({
           err: error
       })
   })
})



router.post('/', (req, res, next) => {
    const order = new Mail({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productid
    });
    order
    .save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message:"Order Stored",
            cretedorder:{
                _id:result._id,
                product:result.product,
                quantity:result.quantity
            },
            request:{
                type:"POST",
                url: 'http://localhost:3000/order/'+result._id
            }

        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}); 


router.get('/:orderid', (req, res, next) => {
    Mail.findById(req.params.orderid)
    .exec()
    .then(result =>{
        res.status(201).json({
            result:result,
            request:{
                type:"GET",
                url:"http//localhost:3000/order"
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
})


      
module.exports = router;