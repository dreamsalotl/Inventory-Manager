const { gql } = require('apollo-server-express');

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
    units: async (_, __, { dataSources }) => {
      return dataSources.unitAPI.getUnits();
    },
    unit: async (_, { id }, { dataSources }) => {
      return dataSources.unitAPI.getUnitById(id);
    },
  },
  Unit: {
    parts: async (unit, _, { dataSources }) => {
      return dataSources.partAPI.getPartsByIds(unit.partIds);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};