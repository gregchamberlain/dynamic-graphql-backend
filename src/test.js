const { buildSchema } = require('graphql');
const graphql = require('graphql');
const mongoose = require('mongoose');

const jsonSchema = [
  {
    name: 'Tower',
    fields: [
      {
        name: 'id',
        type: 'ID',
        nullable: false,
        list: false
      },
      {
        name: 'name',
        type: 'String',
        nullable: false,
        list: false
      }
    ]
  },
  {
    name: 'Radio',
    fields: [
      {
        name: 'id',
        type: 'ID',
        nullable: false,
        list: false
      },
      {
        name: 'make',
        type: 'String',
        nullable: false,
        list: false
      },
      {
        name: 'model',
        type: 'String',
        nullable: false,
        list: false
      },
      {
        name: 'description',
        type: 'String',
        nullable: true,
        list: false
      }
    ]
  }
];

const defaultTypes = {
  String: String,
  Int: Number,
  Float: Number,
  Boolean: Boolean,
  ID: true,
};

// const jsonschema = {
//   Person: {
//     firstName: "String!",
//     lastName: "String!",
//     age: "Int"
//   },
//   Tower: {
//     name: "String!",
//     address: "String!",
//     lat: "Float!",
//     lng: "Float!",
//     APS: '[Radio]',
//   },
//   Radio: {
//     make: "String!",
//     model: "String!",
//     description: "String"
//   },
//   Query: {
//     people: "[Person]"
//   }
// };

const parseSchema = models => {
  let str = '';
  models.forEach(model => {
    str += `type ${model.name} {`;
    model.fields.forEach(field => {
      str += `${field.name}: ${listify(field)}${field.nullable ? '' : '!'},`;
    });
    str += '}';
  });
  return str;
};

const parseModels = models => {
  const mongooseModels = {};
  models.forEach(model => {
    const schema = {};
    model.fields.forEach(field => {
      if (field.name === 'id') return;
      schema[field.name] = defaultTypes[field.type];
    });
    mongoose.model(model.name, schema);
    mongooseModels[model.name] = schema;
  });
  return mongooseModels;
};

const generateQueries = models => {
  const queries = {};
  models.forEach(model => {
    queries[model.name] = () => {

    };
  });
  return queries;
};

const getNode = (modelName, id) => {
  return new Promise((resolve, reject) => {
    mongoose.connection.models[modelName].findOne({ _id: id}, (err, node) => {
      if (err) reject(err);
      else resolve(node);
    });
  });
};

const allNodes = (modelName, args = {}) => {
  return new Promise((resolve, reject) => {
    mongoose.connection.models[modelName].find(args, (err, nodes) => {
      if (err) reject(err);
      else resolve(nodes);
    });
  });
};

const generateSchema = model => {

};

const listify = (type, list)=> (
  list ? new graphql.GraphQLList(type) : type
);

const nullify = (type, nullable) => (
  nullable ? type : new graphql.GraphQLNonNull(type)
);

const parseField = field => {
  const type =  nullify(listify(field.type, field.list), field.nullable);
  if (field.relation) {
    
  }
};

const graphqlTypes = {
  String: graphql.GraphQLString,
  Int: graphql.GraphQLInt,
  Float: graphql.GraphQLFloat,
  Boolean: graphql.GraphQLBoolean,
  ID: graphql.GraphQLID
};

let schemaString = parseSchema(jsonSchema);
schemaString += `
type Query {
  towers: [Tower]
  radios: [Radio]
}
`;


// console.log(parseModels(jsonSchema));
// console.log(generateQueries(jsonSchema));
// console.log(buildSchema(schemaString));
module.exports = buildSchema(schemaString);

const graphqlSchema = `
  type Tower {
    name: String!
    address: String!
    lat: Float
    lng: Float
  }
  type Radio {
    make: String!
    model: String
  }

  type Query {
    towers: [Tower]
  }
`;

console.log(buildSchema(graphqlSchema));
