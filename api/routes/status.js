const express = require('express');
const router = express.Router();
const User = require('../model/user.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check_auth.js');

router.get('/block/:username', checkAuth, async (req,res,next)=>{
    username = req.params.username;
    
    const user = await User.exists({username:username})
    if(!user){
        return res.status(500).json({
            msg: "bad request"
        });
    }

    User.updateOne({username:username},{$set:{active:false}},(err,result)=>{
        if(err){
            return res.status(500).json({
                msg: "bad request"
            });
        }else{
            res.status(200).json({
                result:result
            })
        }
    })
})


router.get('/unblock/:username',checkAuth, async (req,res,next)=>{
    username = req.params.username;
    
    const user = await User.exists({username:username})
    if(!user){
        return res.status(500).json({
            msg: "bad request"
        });
    }

    User.updateOne({username:username},{$set:{active:true}},(err,result)=>{
        if(err){
            return res.status(500).json({
                msg: "bad request"
            });
        }else{
            res.status(200).json({
                result:result
            })
        }
    })
})


module.exports = router