const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const { typeDefs: UserTypeDefs, resolvers: UserResolvers } = require('./gql/User');
const { typeDefs: PartTypeDefs, resolvers: PartResolvers } = require('./gql/Part');
const { typeDefs: UnitTypeDefs, resolvers: UnitResolvers } = require('./gql/Unit');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs: gql`
    ${UserTypeDefs}
    ${PartTypeDefs}
    ${UnitTypeDefs}
  `,
  resolvers: [
    UserResolvers,
    PartResolvers,
    UnitResolvers,
  ],
});

server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });

  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
  });
});