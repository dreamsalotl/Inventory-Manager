const { gql } = require('apollo-server-express');
const PartModel = require('../models/PartModel');
const SupplierModel = require('../models/SupplierModel');

const typeDefs = gql`
  type Part {
    id: ID!
    name: String!
    quantityInStock: Int!
    units: [Unit]
    partNumber: String!
    skuNumber: String!
    supplier: Supplier
  }

  type Query {
    parts: [Part]
    partsBySupplierSourceCode(sourceCode: String!): [Part]
  }
`;

const resolvers = {
  Query: {
    parts: async () => {
      return PartModel.find({});
    },
    partsBySupplierSourceCode: async (_, { sourceCode }) => {
      const supplier = await SupplierModel.getSupplierBySourceCode(sourceCode);
      return PartModel.find({ supplier: supplier.id });
    },
  },
  Part: {
    units: async (part) => {
      return part.units.map(unitId => UnitModel.findById(unitId));
    },
    supplier: async (part) => {
      return SupplierModel.findById(part.supplier);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};