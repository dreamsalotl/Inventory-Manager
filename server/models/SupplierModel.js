const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sourceCode: { type: String, required: true },
});

const SupplierModel = mongoose.model('Supplier', supplierSchema);

SupplierModel.getSuppliers = function() {
  return this.find({});
};

SupplierModel.getSupplierById = function(id) {
  return this.findById(id);
};

SupplierModel.getSupplierBySourceCode = function(sourceCode) {
  return this.findOne({ sourceCode });
};

module.exports = SupplierModel;