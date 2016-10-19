import express from 'express';
import bodyParser from 'body-parser';
const graphqlHTTP = require('express-graphql');
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import schema from './test';
import typeDefs from './schema';
import resolvers from './resolve';

const PORT = 8080;

const app = express();

// app.use('/graphql', bodyParser.json(), apolloExpress({ schema: makeExecutableSchema({typeDefs, resolvers}) }));

// app.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
// }));
const rootValue = {
  towers: () => {
    return [
      { id: 1, name: 'ERWT'},
      { id: 2, name: 'Cranberry'},
      { id: 3, name: 'St. Germain'},
    ];
  },
  radios: () => {
    return [
      { id: 1, make: 'Ubiquity', model: 'Bullet M2' },
      { id: 2, make: 'Ubiquity', model: 'NanoStation M900' },
      { id: 3, make: 'Ubiquity', model: 'Rocket M2' },
      { id: 4, make: 'Ubiquity', model: 'Rocket M900' },
    ];
  }
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
