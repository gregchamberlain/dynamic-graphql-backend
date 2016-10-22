const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  buildSchema
} = require('graphql');
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
      },
      {
        name: 'aps',
        type: 'AP',
        nullable: false,
        list: true
      }
    ]
  },
  {
    name: 'AP',
    fields: [
      {
        name: 'id',
        type: 'ID',
        nullable: false,
        list: false
      },
      {
        name: 'radio',
        type: 'Radio',
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
  String: true,
  Int: true,
  Float: true,
  Boolean: true,
  ID: true
};

function toResolve(models) {
  let resolve = {};
  models.forEach(model => {
    resolve[model.name] = constructResolve(model);
  });
  return resolve;
}

function constructResolve(model) {
  let resolve = {};
  model.fields.forEach(field => {
    if (!defaultTypes[field.type]) {
      resolve[field.name] = resolveRelation(field, model.name);
    }
  });
  return resolve;
}

function resolveRelation(field, modelName) {
  // const Model = mongoose.connection.models[field.name];
  // hasMany
  if (field.list) {
    return `This is a List of ${field.name}`;
    // return (model) => {
    //   return Model.find({[`${modelName}Id`]: model.id });
    // };
  // belongsTo
  } else {
    return `This is a single ${field.name}`;
    // return (model) => {
    //   return Model.findOne({_id: model[`${modelName}Id`]});
    // };
  }
}

console.time('test');
console.log(JSON.stringify(toResolve(jsonSchema), null, 4));
console.timeEnd('test');
