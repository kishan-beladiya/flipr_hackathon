const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const breakSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, trim: true, required: true, minlength:3},
    task_type: { type: String, trim: true, required: true},
    task_desc: { type: String, trim: true, required: true, minlength:5},
    start_timestamp: { type: Number, trim: true, required: true},
    duration: { type: Number, trim: true, required: true},
    date: { type: String, trim: true, required: true},
})

module.exports = mongoose.model('Break', breakSchema);