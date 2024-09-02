const bannerSwiper = new Swiper('.js-swiper-banner', {
  // Optional parameters
  observer: true,
  observeParents: true,
  loop: true,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 0,
  speed: 900,
  parallax: true,
  preloadImages: false,
  // autoplay: {
  //   delay: 5000,
  // },

  // If we need pagination
  pagination: {
    el: '.js-swiper-pagination--banner',
    clickable: true,
    autoHeight: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.js-swiper-button-next--banner',
    prevEl: '.js-swiper-button-prev--banner',
  },

  // Брейкпоинты

  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    992: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    1268: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },
  }

});

const aboutSwiper = new Swiper('.js-swiper-about', {
  // Optional parameters
  observer: true,
  observeParents: true,
  loop: false,
  slidesPerView: 1.8,
  slidesPerGroup: 1.8,
  spaceBetween: 15,
  speed: 900,
  parallax: true,
  preloadImages: false,
  // autoplay: {
  //   delay: 3000,
  // },

  // Navigation arrows
  navigation: {
    nextEl: '.js-swiper-button-next--about',
    prevEl: '.js-swiper-button-prev--about',
    disabledClass: 'swiper-button-disabled',
  },

  // Брейкпоинты

  breakpoints: {
    320: {
      slidesPerView: 1.8,
      slidesPerGroup: 1.8,
    },
    479: {
      slidesPerView: 2.2,
      slidesPerGroup: 2.2,
    },
    768: {
      slidesPerView: 2.2,
      slidesPerGroup: 2.2,
    },
    992: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1268: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  }

});

const categoriesSwiper = new Swiper('.js-swiper-categories', {
  // Optional parameters
  observer: true,
  observeParents: true,
  loop: false,
  slidesPerView: 3.7,
  slidesPerGroup: 3.7,
  spaceBetween: 0,
  speed: 900,
  parallax: true,
  preloadImages: false,

  // Navigation arrows
  navigation: {
    nextEl: '.js-swiper-button-next--categories',
    prevEl: '.js-swiper-button-prev--categories',
    disabledClass: 'swiper-button-disabled',
  },

  // Брейкпоинты

  breakpoints: {
    320: {
      slidesPerView: 3.7,
      slidesPerGroup: 3.7,
      spaceBetween: 0,
    },
    340: {
      slidesPerView: 4.3,
      slidesPerGroup: 4.3,
    },
    479: {
      slidesPerView: 5.7,
      slidesPerGroup: 5.7,
    },
    606: {
      slidesPerView: 6.7,
      slidesPerGroup: 6.7,
    },
    700: {
      slidesPerView: 7.7,
      slidesPerGroup: 7.7,
    },
    900: {
      slidesPerView: 6.7,
      slidesPerGroup: 6.7,
    },
    1190: {
      slidesPerView: 8.7,
      slidesPerGroup: 8.7,
    },
    1280: {
      slidesPerView: 9,
      slidesPerGroup: 9,
      spaceBetween: 10,
    },
    1440: {
      slidesPerView: 10,
      slidesPerGroup: 5,
      spaceBetween: 10,
    },
    1700: {
      slidesPerView: 11,
      slidesPerGroup: 5,
      spaceBetween: 25,
    },
  }

});