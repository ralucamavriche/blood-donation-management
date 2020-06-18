const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//question Model
const Question = require("../../models/Question");

//@routes GET api/questions
//@desc Get All Questions
//@access Public
router.get("/", (req, res) => {
  Question.find()
    .sort({ date: -1 })
    .then((questions) => res.json(questions));
});

//@routes GET api/questions
//@desc Get Questions by ID
//@access Public
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Question.find()
    .findById(id)
    .then((question) => {
      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ msg: "Question not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//@routes POST api/questions
//@desc Create A Questions
//@access Private
router.post("/", (req, res) => {
  const { author,email, question} = req.body;
  const newQuestion = new Question({
    author,
    email,
    question,
  });

  newQuestion
    .save()
    .then((question) => res.json(question))
    .catch((err) => res.json(err));
});

//@routes DELETE api/questions
//@desc Delete A Questions
//@access Private
router.delete("/:id", (req, res) => {
  Question.findById(req.params.id)
    .then((question) =>
      question.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

//@routes UPDATE api/question
//@desc Update A Questions
//@access Private
router.patch("/:id", (req, res) => {
  Question.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((questions) => res.json({ questions, success: true }))
    .catch((err) => res.status(404).json({ err, success: false }));
});

module.exports = router;
