const { gql } = require('apollo-server-express');
const SupplierModel = require('../models/SupplierModel');

const typeDefs = gql`
  type Supplier {
    id: ID!
    name: String!
    sourceCode: String!
  }

  type Query {
    suppliers: [Supplier]
    supplierBySourceCode(sourceCode: String!): Supplier
  }
  type Mutation {
    updateSupplier(id: ID!, name: String, sourceCode: String): Supplier
    removeSupplier(id: ID!): Supplier
  }
`;

const resolvers = {
  Query: {
    suppliers: async () => {
      return SupplierModel.getSuppliers();
    },
    supplierBySourceCode: async (_, { sourceCode }) => {
      return SupplierModel.getSupplierBySourceCode(sourceCode);
    },
  },
  Mutation: {
    updateSupplier: async (_, { id, name, sourceCode }) => {
      return SupplierModel.findByIdAndUpdate(id, { name, sourceCode }, { new: true });
    },
    removeSupplier: async (_, { id }) => {
      return SupplierModel.findByIdAndRemove(id);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};