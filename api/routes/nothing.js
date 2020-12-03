const express  = require('express')
const router = express.Router();
const mongoose = express('mongoose')

const Mail = require('../models/order');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'order were fetched'
    })
})

router.post('/', (req, res, next) => {
    const order = new Mail({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productid
    });
    order
    .save()
  
    .then(result =>{
        console.log(result);
        res.status(201).json(result)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
  
})

router.post('/:orderid', (req, res, next) => {
    const id = req.params.orderid;
    if(id === '123'){
    res.status(200).json({
        message: 'order fetched with order id',
        id:id
    })}
    else{
        res.status(200).json({
            message: 'this order cant be fetched'
        })
    }
})

module.exports = router;