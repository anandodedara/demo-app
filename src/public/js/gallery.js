const data = {};
const loadImages = (page) => {
  const url =
    'https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=57f14afcc05dcca04e650f715df54cfe&user_id=77182094%40N02&format=json&nojsoncallback=1&page=' +
    page;
  $.ajax({
    url: url,
    success: (response) => {
      response.photos.photo.map((item) => {
        const url = `http://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
        const html = `<div class="col-sm-6 col-md-4 col-lg-3 item mt-2"><a href="${url}" data-lightbox="photos"><img class="lazy img-fluid" src="${url}"></a></div>`;
        $('.photos').append(html);
      });
      data.totalPages = response.photos.pages;
      data.page = response.photos.page;
      data.isLoading = false;
    },
    error: (response) => {
      console.log(response);
    },
  });
};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > 0 || entry.isIntersecting) {
      const image = entry.target;
      observer.unobserve(image);

      if (image.hasAttribute('src')) {
        // Image has been loaded already
        return;
      }

      // Image has not been loaded so load it
      const sourceUrl = image.getAttribute('data-src');
      image.setAttribute('src', sourceUrl);

      image.onload = () => {
        // Do stuff
      };

      // Removing the observer
      observer.unobserve(image);
    }
  });
});

document.querySelectorAll('.lazy').forEach((el) => {
  observer.observe(el);
});

const onScroll = () => {
  if (location.pathname.includes('gallery')) {
    if ($(window).scrollTop() + window.innerHeight >= Math.ceil(document.body.scrollHeight) - 10) {
      if (!data.isLoading) {
        data.isLoading = true;
        data.page++;
        loadImages(data.page);
      }
    }
  }
};
$(document.body).on('touchmove', onScroll); // for mobile
$(window).on('scroll', onScroll); // for desktop
$(document).ready(() => {
  $('.lazy').Lazy();
  loadImages(1);
});
