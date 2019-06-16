const mongoose = require('mongoose');

const { Schema } = mongoose;

const organizationSchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model('Organization', organizationSchema);
