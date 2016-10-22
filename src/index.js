const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { apolloExpress, graphiqlExpress } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

// import schema from './manualSchema';
// const schema = require('./manualSchema');
const typeDefs = require('./schema');
const resolvers = require('./resolve');
const db = require('./db');

const PORT = 8080;

const app = express();
const router = express.Router({mergeParams: true});
const toSchemaString = require('./tools/toSchemaString');

router.use('/graphql', bodyParser.json(), (req, res, next) => {
  db.getModels().then((models) => {
    // console.log(toSchemaString(models));
    console.log(models);
    apolloExpress({ schema: makeExecutableSchema({typeDefs, resolvers}) })(req, res, next);
  });
});

router.use('/graphiql', (req, res, next) => {
  graphiqlExpress({
    endpointURL: `/${req.params.projectId}/graphql`,
  })(req, res, next);
});

app.use('/:projectId', router);


// const rootValue = {
//   towers: () => {
//     return [
//       { id: 1, name: 'ERWT'},
//       { id: 2, name: 'Cranberry'},
//       { id: 3, name: 'St. Germain'},
//     ];
//   },
//   radios: () => {
//     return [
//       { id: 1, make: 'Ubiquity', model: 'Bullet M2' },
//       { id: 2, make: 'Ubiquity', model: 'NanoStation M900' },
//       { id: 3, make: 'Ubiquity', model: 'Rocket M2' },
//       { id: 4, make: 'Ubiquity', model: 'Rocket M900' },
//     ];
//   }
// };

// app.use('/graphql', graphqlHTTP({
//   schema,
//   rootValue,
//   graphiql: true
// }));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
