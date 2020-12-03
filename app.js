const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyparser = require("body-parser")
const mongoose = require("mongoose")

const productroutes = require('./api/routes/product');
const orderroutes = require('./api/routes/order');
const userroutes = require('./api/routes/user')


app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('mongodb://admin:awayfull@cluster0-shard-00-00-vvzpd.mongodb.net:27017,cluster0-shard-00-01-vvzpd.mongodb.net:27017,cluster0-shard-00-02-vvzpd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true
})
app.use('/product', productroutes);
app.use('/order', orderroutes);
app.use('/user',userroutes);




// app.use((req,res,next) => {                                                                                                                                                                                                                                                                                                                                                  
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err)
// })

// app.use((error,res,req,next) =>{
//     res.status(500).json({
//         error:{
//             message: error.message
//         }
//     })
// })
module.exports = app;
