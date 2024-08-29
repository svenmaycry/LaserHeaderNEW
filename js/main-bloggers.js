const mainBloggersSwiper = new Swiper('.js-swiper-main-bloggers', {
  // Optional parameters
  observer: true,
  observeParents: true,
  loop: false,
  slidesPerView: 1.4,
  slidesPerGroup: 1.4,
  spaceBetween: 10,
  speed: 900,
  parallax: true,
  preloadImages: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination--main-bloggers',
    clickable: true,
    autoHeight: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next--main-bloggers',
    prevEl: '.swiper-button-prev--main-bloggers',
    disabledClass: 'swiper-button-disabled',
  },

  scrollbar: {
    el: '.swiper-scrollbar--main-bloggers',
    draggable: true
  },

  // Брейкпоинты

  breakpoints: {
    320: {
      slidesPerView: 1.4,
      slidesPerGroup: 1.4,
      spaceBetween: 10,
    },
    479: {
      slidesPerView: 1.7,
      slidesPerGroup: 1.7,
      spaceBetween: 10,
    },
    767: {
      slidesPerView: 2.3,
      slidesPerGroup: 2.3,
      spaceBetween: 30,
    },
    1279: {
      slidesPerView: 3.3,
      slidesPerGroup: 3.3,
      spaceBetween: 35,
    },
    1601: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 35,
    },
  }
});