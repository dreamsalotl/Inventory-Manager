const mongoose = require('mongoose');
const db = require('../config/connection');
const UserModel = require('../models/UserModel');
const UnitModel = require('../models/UnitModel');
const PartModel = require('../models/PartModel');
const SupplierModel = require('../models/SupplierModel');

const seed = async () => {
  await db;

  const user1 = await UserModel.create({ username: 'User 1', email: 'user1@example.com', password: 'password1' });
  const user2 = await UserModel.create({ username: 'User 2', email: 'user2@example.com', password: 'password2' });

  const unit1 = await UnitModel.create({ name: 'Unit 1', description: 'Description 1' });
  const unit2 = await UnitModel.create({ name: 'Unit 2', description: 'Description 2' });

  const supplier1 = await SupplierModel.create({ name: 'Supplier 1', sourceCode: 'S1' });
  const supplier2 = await SupplierModel.create({ name: 'Supplier 2', sourceCode: 'S2' });

  const part1 = await PartModel.create({ name: 'Part 1', quantityInStock: 10, units: [unit1.id], partNumber: 'P1', skuNumber: 'SK1', supplier: supplier1.id });
  const part2 = await PartModel.create({ name: 'Part 2', quantityInStock: 20, units: [unit2.id], partNumber: 'P2', skuNumber: 'SK2', supplier: supplier2.id });

  console.log('Data seeded!');
  mongoose.connection.close();
};

seed().catch(console.error);