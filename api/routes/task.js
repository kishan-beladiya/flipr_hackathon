const express = require('express');
const router = express.Router();
const User = require('../model/user.js');
const Meeting = require('../model/task/meeting.js');
const Work = require('../model/task/work.js');
const Break = require('../model/task/break.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check_auth.js');


// add data
router.post('/', checkAuth,async (req, res, next) => {

    const user = await User.exists({username:req.body.username})
    if(!user){
        return res.status(500).json({
            msg: "bad request"
        });
    }

    if (req.body.task_type == 'work') {
        const work = new Work({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            task_type: req.body.task_type,
            task_desc: req.body.task_desc,
            start_timestamp: req.body.start_timestamp,
            duration: req.body.duration,
            date: req.body.date
        });

        try {
            await work.save().then(result => {
                console.log(result);
                res.status(200).json({
                    new_task: result,
                    msg: "OK"
                });
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
    else if (req.body.task_type == 'meeting') {
        const meeting = new Meeting({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            task_type: req.body.task_type,
            task_desc: req.body.task_desc,
            start_timestamp: req.body.start_timestamp,
            duration: req.body.duration,
            date: req.body.date
        });

        try {
            await meeting.save().then(result => {
                console.log(result);
                res.status(200).json({
                    new_task: result,
                    msg: "OK"
                });
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
    else {
        const break_task = new Break({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            task_type: req.body.task_type,
            task_desc: req.body.task_desc,
            start_timestamp: req.body.start_timestamp,
            duration: req.body.duration,
            date: req.body.date
        });

        try {
            await break_task.save().then(result => {
                console.log(result);
                res.status(200).json({
                    new_task: result,
                    msg: "OK"
                });
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


// fetch data
router.get('/today/:username', checkAuth, async (req, res, next) => {
    username = req.params.username;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;

    const workData = await Work.find({username:username,date:today});
    const meetingData = await Meeting.find({username:username,date:today});
    const breakData = await Break.find({username:username,date:today});

    res.status(200).json({
        work:workData,
        meeting:meetingData,
        break:breakData,
    });
})



router.get('/yesterday/:username', checkAuth, async (req, res, next) => {
    username = req.params.username;
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);
    var dd = String(prev_date.getDate()).padStart(2, '0');
    var mm = String(prev_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = prev_date.getFullYear();

    prev_date = dd + '-' + mm + '-' + yyyy;

    const workData = await Work.find({username:username,date:prev_date});
    const meetingData = await Meeting.find({username:username,date:prev_date});
    const breakData = await Break.find({username:username,date:prev_date});

    res.status(200).json({
        work:workData,
        meeting:meetingData,
        break:breakData,
    });
})


router.get('/lastweek/:username', checkAuth, async (req, res, next) => {
    username = req.params.username;
    var prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);
    var dd = String(prev_date.getDate()).padStart(2, '0');
    var mm = String(prev_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = prev_date.getFullYear();

    prev_date = dd + '-' + mm + '-' + yyyy;

    const workData = await Work.find({username:username,date:prev_date});
    const meetingData = await Meeting.find({username:username,date:prev_date});
    const breakData = await Break.find({username:username,date:prev_date});

    res.status(200).json({
        work:workData,
        meeting:meetingData,
        break:breakData,
    });
})

module.exports = router