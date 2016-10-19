const { buildSchema } = require('graphql');
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

const listify = field => (
  field.list ? `[${field.type}]` : field.type
);

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
    mongooseModels[model.name] = schema;
  });
  return mongooseModels;
};

let schemaString = parseSchema(jsonSchema);
schemaString += `
type Query {
  towers: [Tower]
  radios: [Radio]
}
`;

console.log(parseModels(jsonSchema));
// console.log(buildSchema(schemaString));
module.exports = buildSchema(schemaString);
