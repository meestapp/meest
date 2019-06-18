/* eslint-disable func-names */
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
  excerpt: {
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
  tags: [{
    type: String,
  }],
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

// eslint-disable-next-line prefer-arrow-callback
meetingSchema.pre('save', function (next) {
  if (this.description.length > 0) {
    this.excerpt = `${this.description.substring(0, 50)}...`;
  } else {
    this.excerpt = this.description;
  }
  next();
});

module.exports = mongoose.model('Meeting', meetingSchema);
