const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const bcrypt = require('bcryptjs');
const config = require('config');
const jtw = require('jsonwebtoken');

//User Model
const User = require('../../models/User');
const Donor = require('../../models/Donor');


//@routes POST api/users
//@desc Register new user
//@acceSs Public

router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(donors => res.json(donors));
});
router.post('/', (req, res) => {
    const { name, email, password, donors_list = [], role = 'admin' } = req.body;

    //Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                name,
                email,
                password,
                donors_list,
                role
            });

            //Create salt and hash 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => {
                        res.json({
                            user: {
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                                donors_list: user.donors_list
                            }
                        })
                    });
                })
            })
        })
});

router.patch('/:id', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then((user) => {
            User.findById(req.params.id)
                .select('-password')
                .then(user => {
                    if (user) {
                        res.json({ user, success: true })
                    } else {
                        res.status(404).json({
                            status: 'failed'
                        })
                    }
                });
        })
        .catch(err => res.status(404).json({ err, success: false }));
});
router.post('/password/:id', (req, res) => {
    const {currentPassword, newPassword, newPassword2} = req.body;
    User.findOne({ _id:req.params.id })
    .then(user => {
        if (!user) return res.status(400).json({ msg: 'User Does not exists ' });
        //Validate password
        bcrypt.compare(currentPassword, user.password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({ msg: 'Invalid current Password' });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user.save().then(user => {
                            res.status(200).json({
                                status:'success'
                            })
                        });
                    })
                })
            })
    })
});
//@routes GET api/users
//@desc ALL user
//@acceSs Public
router.get('/', function (req, res, next) {
    User.find()
        .then(user => res.json(user))
});

router.post("/addToDonorsList", (req, res) => {
    User.find({ _id: req.user.user_id })
});

module.exports = router;