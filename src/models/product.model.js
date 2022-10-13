const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    serial: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.pre('save', async function (next) {
  const product = this;
  const latest = await Product.findOne().sort('-createdAt'); // eslint-disable-line no-use-before-define
  if (product.serial === 0) {
    product.serial = latest.serial + 1;
  }
  next();
});

/**
 * @typedef Product
 */
const Product = mongoose.model('product', productSchema);

module.exports = Product;
