const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Request Model
const BloodRequest = require('../../models/BloodRequest');


//@routes GET api/request
//@desc Get All blood request
//@acceSs Public
router.get('/', (req, res) => {
    BloodRequest.find()
        .sort({ date: -1 })
        .then(requests => res.json(requests));
});


//@routes GET api/request
//@desc Get Request by ID
//@acceSs Public
router.get('/:id', (req, res) => {
    const id = req.params.id;
    BloodRequest.findById(id)
        .then(request => {
            if (request) {
                res.status(200).json(request);
            } else {
                res.status(404).json({ msg: 'Request not found' });
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
    const { title, author, description, blood_type } = req.body;
    const newBloodRequest = new BloodRequest({
        title,
        author,
        description,
        blood_type
    });

    newBloodRequest.save().then(request => res.json(request))
    .catch(err => res.json(err))
});

//@routes DELETE api/request
//@desc Delete A Request
//@acceSs Private
router.delete('/:id', (req, res) => {
    BloodRequest.findById(req.params.id)
        .then(request => request.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;