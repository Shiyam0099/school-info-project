import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './reslovers/index';

const models = require('../models');
models.sequelize.authenticate();
models.sequelize.sync();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    //from context: {.....} [as an object] to context(){} [as a function]
    return {
      models,
      request,
    };
  },
});

server.start(() => {
  console.log(`The server is up!`);
});
