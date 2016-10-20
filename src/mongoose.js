const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const startTime = new Date();
const TowerSchema = new Schema({
  name: String,
  address: String,
  lat: Number,
  lng: Number
});

const RadioSchema = new Schema({
  make: String,
  model: String,
  description: String
});

const Tower = mongoose.model('Tower', TowerSchema);
const Radio = mongoose.model('Radio', RadioSchema);
console.log(new Date() - startTime);
