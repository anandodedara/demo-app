const express = require('express');
const productRoute = require('./product.route');
const galleryRoute = require('./gallery.route');
const indexRoute = require('./index.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '',
    route: indexRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/gallery',
    route: galleryRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
