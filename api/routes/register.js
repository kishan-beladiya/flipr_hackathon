const express = require('express');
const router = express.Router();
const User = require('../model/user.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res, next) => {

    if(req.body.password.length<8){
        return res.status(500).json({
            msg: "bad request"
        });
    }
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                msg: "bad request"
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash,
                email: req.body.email,
                full_name: req.body.full_name,
                phone: req.body.phone,
                department: req.body.department,
                joining_date: req.body.joining_date,
                admin: req.body.admin,
                active: req.body.active
            });


            // validation and saving

            try {
                await User.findOne({ username: user.username })
                    .then(async result => {
                        if (result) {
                            return res.status(500).json({
                                msg: "user exist"
                            })
                        }


                        await user.save().then(result => {
                            console.log(result);
                            res.status(200).json({
                                new_user: result,
                                msg: "OK"
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({
                                msg: "bad request"
                            })
                        })

                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            msg: "bad request"
                        })
                    })
            } catch (e) {
                console.log(e);
                res.status(500).json({
                    msg: "bad request"
                })
            }
        }
    })

});

module.exports = router;