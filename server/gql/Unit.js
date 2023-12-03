const { gql } = require('apollo-server-express');
const UnitModel = require('../models/UnitModel');
const PartModel = require('../models/PartModel');

const typeDefs = gql`
  type Unit {
    id: ID!
    name: String!
    parts: [Part]
  }

  type Part {
    id: ID!
    name: String!
    quantityInStock: Int!
  }

  type Query {
    units: [Unit]
    unit(id: ID!): Unit
  }
`;

const resolvers = {
  Query: {
    units: async () => {
      return UnitModel.getUnits();
    },
    unit: async (_, { id }) => {
      return UnitModel.getUnitById(id);
    },
  },
  Unit: {
    parts: async (unit) => {
      return PartModel.getPartsByIds(unit.partIds);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};