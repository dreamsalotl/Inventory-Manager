const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantityInStock: { type: Number, required: true, default: 0 },
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }],
  partNumber: { type: String, required: true },
  skuNumber: { type: String, required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
});

const PartModel = mongoose.model('Part', partSchema);

module.exports = PartModel;