const catchAsync = require('../utils/catchAsync');

const photosList = catchAsync(async (req, res) => {
  res.render('gallery/photo-list', {
    pageTitle: 'Gallery',
    path: '/gallery',
  });
});

module.exports = {
  photosList,
};
