const faker = require('faker');
const { Product } = require('../../../src/models');

describe('Product model', () => {
  describe('Product validation', () => {
    let newProduct;
    beforeEach(() => {
      newProduct = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(0, 100000, 0),
      };
    });

    test('should correctly validate a valid product', async () => {
      await expect(new Product(newProduct).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if price is invalid', async () => {
      newProduct.price = 'invalidEmail';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });
  });
});
