const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }],
});

const UnitModel = mongoose.model('Unit', unitSchema);

UnitModel.getUnits = function() {
  return this.find({});
};

UnitModel.getUnitById = function(id) {
  return this.findById(id);
};

module.exports = UnitModel;