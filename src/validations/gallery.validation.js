const Joi = require('joi');

const getPhotos = {
  query: Joi.object().keys({
    page: Joi.number().integer().default(1),
  }),
};
module.exports = {
  getPhotos,
};
