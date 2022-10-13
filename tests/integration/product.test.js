const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Product } = require('../../src/models');
const { productOne, productTwo, insertProducts } = require('../fixtures/product.fixture');

setupTestDB();

describe('Product routes', () => {
  describe('POST /products', () => {
    const newProduct = {
      name: faker.commerce.productName(),
      price: faker.datatype.number({ min: 0, max: 100000 }),
    };

    test('should return 200 and successfully create new product if data is ok', async () => {
      await insertProducts([productOne]);

      const res = await request(app).post('/products').send(newProduct).expect(httpStatus.CREATED);
      expect(res.body).not.toHaveProperty('stack');
      expect(res.body).toEqual({
        id: expect.anything(),
        serial: expect.anything(),
        name: newProduct.name,
        price: newProduct.price,
      });

      const dbProduct = await Product.findById(res.body.id);
      expect(dbProduct).toBeDefined();
      expect(dbProduct).toMatchObject({ name: newProduct.name, price: newProduct.price });
    });

    test('should return 400 error if name is missing', async () => {
      await request(app)
        .post('/products')
        .send({
          price: newProduct.price,
        })
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if price is missing', async () => {
      await request(app)
        .post('/products')
        .send({
          name: newProduct.name,
        })
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /products/:id', () => {
    test('should return 200 and the product object if data is ok', async () => {
      await insertProducts([productOne]);
      const res = await request(app).get(`/products/${productOne._id}`).send().expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: productOne._id.toHexString(),
        serial: expect.anything(),
        name: productOne.name,
        price: productOne.price,
      });
    });

    test('should return 400 error if productId is not a valid mongo id', async () => {
      await insertProducts([productOne]);

      await request(app).get('/products/invalidId').send().expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if product is not found', async () => {
      await insertProducts([productTwo]);

      await request(app).get(`/products/${productOne._id}`).send().expect(httpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /products/:id', () => {
    test('should return 204 if data is ok', async () => {
      await insertProducts([productOne]);

      await request(app).delete(`/products/${productOne._id}`).send().expect(httpStatus.NO_CONTENT);

      const dbProduct = await Product.findById(productOne._id);
      expect(dbProduct).toBeNull();
    });
  });

  describe('PATCH /products/:id', () => {
    test('should return 200 and successfully update product if data is ok', async () => {
      await insertProducts([productOne]);
      const updateBody = {
        name: faker.commerce.productName(),
        price: faker.datatype.number({ min: 0, max: 100000 }),
      };

      const res = await request(app).patch(`/products/${productOne._id}`).send(updateBody).expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: productOne._id.toHexString(),
        serial: expect.anything(),
        name: updateBody.name,
        price: updateBody.price,
      });

      const dbProduct = await Product.findById(productOne._id);
      expect(dbProduct).toBeDefined();
      expect(dbProduct).toMatchObject({ name: updateBody.name, price: updateBody.price });
    });

    test('should return 400 error if id is not a valid mongo id', async () => {
      await insertProducts([productOne]);
      const updateBody = { name: faker.commerce.productName() };

      await request(app).patch(`/products/invalidId`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if price is invalid', async () => {
      await insertProducts([productOne]);
      const updateBody = { price: -10 };

      await request(app).patch(`/products/${productOne._id}`).send(updateBody).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if body is empty', async () => {
      await insertProducts([productOne]);
      await request(app).patch(`/products/${productOne._id}`).send().expect(httpStatus.BAD_REQUEST);
    });
  });
});
