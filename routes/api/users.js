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
router.post('/', (req, res) => {
    const { name, email, password, donors_list } = req.body;

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
                donors_list
                // name: req.body.name,
                // email: req.body.email,
                // password: req.body.password,
                // donors_list: req.body.donors_list
            });

            //Create salt and hash 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => {
                        jtw.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                        donors_list: user.donors_list
                                    }
                                })
                            }
                        )
                    });
                })
            })
        })
});



// router.get('/', (req, res) => {
//     User.find()
//         .sort({ date: -1 })
//         .then(users => {
//             res.json(users)
//         });
// });

// router.get('/', (req, res) => {
//     User.find({})
//         // .populate('donors', 'name email age weight phone_number', Donor)
//         // .exec()
//         .then(user => {
//             res.json(user)
//         });
// });


// router.post('/', (req, res, next) => {
//     const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         donors_list: req.body.donorsId
//     });
//     newUser.save().then(
//         result => {
//             console.log(result);
//             res.status(201).json(result);
//         }
//     ).catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     });
// });

//@routes GET api/users
//@desc ALL user
//@acceSs Public
router.get('/', function (req, res, next) {
    User.find()
        .then(user => res.json(user))
});

router.post("/addToDonorsList",(req, res) => {
    User.find({_id: req.user.user_id})
});

module.exports = router;