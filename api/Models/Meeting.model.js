const mongoose = require('mongoose');

const { Schema } = mongoose;

const meetingSchema = new Schema({
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  startedAt: {
    type: Number,
    default: 0,
  },
  finishedAt: {
    type: Number,
    default: 0,
  },
  value: {
    type: Number,
    default: 0,
  },
  record: {
    type: String,
  },
  log: [{
    action: {
      type: String,
    },
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
});

module.exports = mongoose.model('Meeting', meetingSchema);
