const express = require('express');
const router = express.Router();
const User = require('../model/user.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(500).json({
                        msg: "bad request"
                    })
                } else {
                    const token = jwt.sign({
                        username: user[0].username,
                        phone: user[0].phone,
                        email: user[0].email
                    },
                        'kishan123',
                        {
                            expiresIn: "720h",
                        }
                    );

                    res.status(200).json({
                        username: user[0].username,
                        full_name: user[0].full_name,
                        phone: user[0].phone,
                        email: user[0].email,
                        admin: user[0].admin,
                        active: user[0].active,
                        token: token,
                    })
                }
            })
        }).catch(err => {
            res.status(500).json({
                msg: "bad request"
            })
        })
})

module.exports = router