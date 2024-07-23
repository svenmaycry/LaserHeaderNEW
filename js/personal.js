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
  autoplay: {
    delay: 5000,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination--banner',
    clickable: true,
    autoHeight: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next--banner',
    prevEl: '.swiper-button-prev--banner',
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

const articlesSwiper = new Swiper('.js-swiper-articles', {
  // Optional parameters
  observer: true,
  observeParents: true,
  loop: false,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 15,
  speed: 900,
  parallax: true,
  preloadImages: false,
  // autoplay: {
  //   delay: 3000,
  // },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination--articles',
    clickable: true,
    autoHeight: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next--articles',
    prevEl: '.swiper-button-prev--articles',
    disabledClass: 'swiper-button-disabled',
  },

  // Брейкпоинты

  breakpoints: {
    320: {
      slidesPerView: 1.4,
      slidesPerGroup: 1.4,
    },
    479: {
      slidesPerView: 2.2,
      slidesPerGroup: 2.2,
    },
    768: {
      slidesPerView: 2.2,
      slidesPerGroup: 2.2,
    },
    1440: {
      slidesPerView: 2.6,
      slidesPerGroup: 2.6,
    },
    992: {
      slidesPerView: 2.6,
      slidesPerGroup: 2.6,
    },
    1268: {
      slidesPerView: 2.6,
      slidesPerGroup: 2.6,
    },
  }

});

const categoriesSwiper = new Swiper('.js-swiper-categories', {
  // Optional parameters
  observer: true,
  observeParents: true,
  loop: false,
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 0,
  speed: 900,
  parallax: true,
  preloadImages: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination--categories',
    clickable: true,
    autoHeight: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next--categories',
    prevEl: '.swiper-button-prev--categories',
    disabledClass: 'swiper-button-disabled',
  },

  // Брейкпоинты

  breakpoints: {
    320: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 0,
    },
    340: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
    479: {
      slidesPerView: 6,
      slidesPerGroup: 6,
    },
    606: {
      slidesPerView: 6,
      slidesPerGroup: 6,
    },
    700: {
      slidesPerView: 8,
      slidesPerGroup: 8,
    },
    900: {
      slidesPerView: 6,
      slidesPerGroup: 6,
    },
    1000: {
      slidesPerView: 7,
      slidesPerGroup: 7,
    },
    1190: {
      slidesPerView: 8,
      slidesPerGroup: 8,
    },
    1279: {
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