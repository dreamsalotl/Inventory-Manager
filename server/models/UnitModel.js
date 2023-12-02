const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }],
});

const UnitModel = mongoose.model('Unit', unitSchema);

module.exports = UnitModel;
