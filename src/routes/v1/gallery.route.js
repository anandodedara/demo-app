const express = require('express');
const validate = require('../../middlewares/validate');
const galleryController = require('../../controllers/gallery.controller');
const galleryValidation = require('../../validations/gallery.validation');

const router = express.Router();

router.route('/').get(validate(galleryValidation.getPhotos), galleryController.photosList);

module.exports = router;
