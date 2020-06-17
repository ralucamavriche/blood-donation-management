const express = require("express");
const router = express.Router();

//Feedback Model
const Feedback = require("../../models/Feedback");

//@routes GET api/feedback
//@desc Get All blood feedback
//@access Public
router.get("/", (req, res) => {
  Feedback.find()
    .sort({ date: -1 })
    .then((feedbacks) => res.json(feedbacks));
});

//@routes GET api/feedback
//@desc Get feedback by ID
//@access Public
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Feedback.findById(id)
    .then((feedback) => {
      if (feedback) {
        res.status(200).json(feedback);
      } else {
        res.status(404).json({ msg: "Feedback not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//@routes POST api/donors
//@desc Create A Donor
//@access Private
router.post("/", (req, res) => {
  const { rating, typeOfFeedback, description } = req.body;
  const newFeedback = new Feedback({
    rating,
    typeOfFeedback,
    description,
  });

  newFeedback
    .save()
    .then((feedback) => res.json(feedback))
    .catch((err) => res.json(err));
});

//@routes DELETE api/feedback
//@desc Delete A feedback
//@access Private
router.delete("/:id", (req, res) => {
  Feedback.findById(req.params.id)
    .then((feedback) =>
      feedback.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

//@routes UPDATE api/feedback
//@desc Update A feedback
//@access Private
router.patch("/:id", (req, res) => {
  Feedback.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((feedback) => res.json({ feedback, success: true }))
    .catch((err) => res.status(404).json({ err, success: false }));
});

module.exports = router;
