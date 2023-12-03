const mongoose = require('mongoose');
const db = require('../config/connection');
const UserModel = require('../models/UserModel');
const UnitModel = require('../models/UnitModel');
const PartModel = require('../models/PartModel');
const SupplierModel = require('../models/SupplierModel');

const cleanDB = async () => {
  await db;

  await UserModel.deleteMany({});
  await UnitModel.deleteMany({});
  await PartModel.deleteMany({});
  await SupplierModel.deleteMany({});

  console.log('Database cleared!');
  mongoose.connection.close();
};

cleanDB().catch(console.error);