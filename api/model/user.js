const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, trim: true, required: true, minlength:3},
    password: { type: String, trim: true, required: true, minlength:8},
    email: { type: String, trim: true, required: true, $regex: /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/},
    full_name: { type: String, trim: true, required: true },
    phone: { type: Number, trim: true, required: true },
    department: { type: String, trim: true, required: true },
    joining_date: { type: String, trim: true, required: true },
    admin: { type: Boolean, trim: true, required: true },
    active: { type: Boolean, trim: true, required: true, null: false }
});

module.exports = mongoose.model('User', userSchema);