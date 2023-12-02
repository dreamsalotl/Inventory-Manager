const { gql } = require('apollo-server-express');
const User = require('../models/UserModel');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(username: String!, password: String!): User
    updateUser(id: ID!, username: String, password: String): User
    deleteUser(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    users: async () => {
        try {
            const users = await User.find();
            return users;
          } catch (error) {
            console.error(error);
            return null;
          }
    },
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
  Mutation: {
    addUser: async (_, { username, password }) => {
        try {
            const user = new User({ username, password });
            await user.save();
            return user;
          } catch (error) {
            console.error(error);
            return null;
          }
    },
    updateUser: async (_, { id, username, password }) => {
      try {
        const user = await User.findByIdAndUpdate(id, { username, password }, { new: true });
        return user;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findByIdAndDelete(id);
        return user ? true : false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};