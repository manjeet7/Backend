const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(result =>{
        if(result.length>=1){
        res.status(409).json({
           message:"email already exist"
        })}
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                       })
                       user
            .save()
            .then(result =>{
                console.log(result)
                res.status(201).json({
                    message: "user created"
                })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            });
                }
            })
              
        }})
    })


    router.post('/login',(req,res,next) =>{
        User.find({email:req.body.email}).exec()
        .then(users=>{
            if(users.length < 1){
                res.status(401).json({
                    message:"auth failed1"
                })
            }
            bcrypt.compare(req.body.password, users[0].password,(err,result)=>{
                if(err){
                    res.status(401).json({
                        message:"auth failed"
                    })
                }
                if(result){
                        const token = jwt.sign({
                            email:  users[0].email,
                            userid: users[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn:"1h"
                        }
                        );
                    return res.status(200).json({
                        message:"auth succesfull",
                        token:token
                    })
                }
                res.status(401).json({
                    message:"auth failed2"
                })
            })
        }).catch(err=>{
            res.status(500).json({
                message:"authentication failed",
                error:err
            })
        })
    })


module.exports = router;