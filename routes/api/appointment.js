const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Appointment Model
const Appointment = require('../../models/Appointment');



//@routes GET api/appointments
//@desc Get All Appointments
//@acceSs Public
router.get('/', (req, res) => {
    Appointment.find()
        .sort({ date: -1 })
        .then(appointments => res.json(appointments));
});


//@routes GET api/appointments
//@desc Get Appointments by ID
//@acceSs Public
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Appointment.findById(id)
        .then(appointment => {
            if (appointment) {
                res.status(200).json(appointment);
            } else {
                res.status(404).json({ msg: 'Appointment not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});


//@routes POST api/appointments
//@desc Create A Appointments
//@acceSs Private
router.post('/', (req, res) => {
    const { date } = req.body;
    const newAppointment = new Appointment({
        date
    });

    newAppointment.save().then(appointment => res.json(appointment))
    .catch(err => res.json(err))
});

//@routes DELETE api/appointments
//@desc Delete A Appointments
//@acceSs Private
router.delete('/:id', (req, res) => {
    Appointment.findById(req.params.id)
        .then(appointment => appointment.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

//@routes UPDATE api/appointment
//@desc Update A Appointments
//@acceSs Private
router.patch('/:id', (req, res) => {
    Appointment.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then((appointments) => res.json({ appointments, success: true }))
        .catch(err => res.status(404).json({ err, success: false }));
});


module.exports = router;