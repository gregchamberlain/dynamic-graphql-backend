const db = require('./db');
const toSchemaString = require('./tools/toSchemaString');
const mongoose = require('mongoose');

db.getModels().then(models => {
  const schemaString = toSchemaString(models);
  console.log(schemaString);
});

console.time('model');
mongoose.model('Model', {
  name: String,
  address: String
});
mongoose.model('Model2', {
  name: String,
  address: String
});
mongoose.model('Model3', {
  name: String,
  address: String
});
mongoose.model('Model4', {
  name: String,
  address: String
});
console.timeEnd('model');
Object.keys(mongoose.connection.models).forEach(modelName => {
  console.log(modelName);
});
