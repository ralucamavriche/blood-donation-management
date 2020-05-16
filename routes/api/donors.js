const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Donor Model
const Donor = require('../../models/Donor');

//@routes GET api/donors
//@desc Get All Donors
//@acceSs Public
router.get('/', (req, res) => {
    Donor.find()
        .sort({ date: -1 })
        .then(donors => res.json(donors));
});


//@routes GET api/donor
//@desc Get Donor by ID
//@acceSs Public
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Donor.findById(id)
        .then(donor => {
            if (donor) {
                res.status(200).json(donor);
            } else {
                res.status(404).json({ msg: 'Donor not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});


//@routes POST api/donors
//@desc Create A Donor
//@acceSs Private
router.post('/', (req, res) => {
    const newDonor = new Donor({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        weight: req.body.weight,
        phone_number: req.body.phone_number
    });

    newDonor.save().then(donor => res.json(donor));
});

//@routes DELETE api/donors
//@desc Delete A Donor
//@acceSs Private
router.delete('/:id', (req, res) => {
    Donor.findById(req.params.id)
        .then(donor => donor.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

//@routes UPDATE api/donors
//@desc Update A Donor
//@acceSs Private
router.patch('/:id', (req, res) => {
    Donor.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then((donor) => res.json({ donor, success: true }))
        .catch(err => res.status(404).json({ err, success: false }));
});


module.exports = router;