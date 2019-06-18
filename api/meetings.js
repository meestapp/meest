/* eslint-disable no-underscore-dangle */
const express = require('express');

const auth = require('./auth/auth');
const Meeting = require('./Models/Meeting.model');
const User = require('./Models/User.model');

const router = express.Router();

router.get('/', auth.required, async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const myself = await User.findOne({ email: userEmail })
      .populate('organization');
    const myMeetings = await Meeting.find({ organization: myself.organization._id })
      .select('-record -log')
      .populate('organizer')
      .populate('participants')
      .populate('log.participant');
    return res.send({ meetings: myMeetings });
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', auth.required, async (req, res, next) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
      .populate('organizer')
      .populate('organization')
      .populate('participants')
      .populate('log.participant');
    return res.send({ meeting });
  } catch (e) {
    return next(e);
  }
});

router.post('/', auth.required, async (req, res, next) => {
  try {
    const myself = await User.findById(req.user.id);
    const { meeting } = req.body;
    const newMeeting = new Meeting({
      ...meeting,
      organizer: req.user.id,
      organization: myself.organization,
    });
    const saved = await newMeeting.save();
    return res.status(201).send(saved._id);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
