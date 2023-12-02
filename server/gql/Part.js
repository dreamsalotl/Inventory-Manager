const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Part {
    id: ID!
    name: String!
  }

  type Query {
    parts: [Part]
  }
`;

const resolvers = {
  Query: {
    parts: () => {
      return [
        {
          id: '1',
          name: 'Part 1',
        },
        {
          id: '2',
          name: 'Part 2',
        },
      ];
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};