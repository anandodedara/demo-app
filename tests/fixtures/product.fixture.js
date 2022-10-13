const mongoose = require('mongoose');
const faker = require('faker');
const Product = require('../../src/models/product.model');

const productOne = {
  _id: mongoose.Types.ObjectId(),
  serial: faker.datatype.number({ min: 1, max: 100 }),
  name: faker.commerce.productName(),
  price: faker.datatype.number({ min: 0, max: 100000 }),
};

const productTwo = {
  _id: mongoose.Types.ObjectId(),
  serial: faker.datatype.number({ min: 1, max: 100 }),
  name: faker.commerce.productName(),
  price: faker.datatype.number({ min: 0, max: 100000 }),
};

const insertProducts = async (products) => {
  await Product.insertMany(products);
};

module.exports = {
  productOne,
  productTwo,
  insertProducts,
};
