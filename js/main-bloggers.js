const mainBloggersSwiper = new Swiper('.js-swiper-main-bloggers', {
  // Optional parameters
  observer: true,
  observeParents: true,
  loop: false,
  slidesPerView: 4,
  slidesPerGroup: 2,
  spaceBetween: 45,
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
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10,
    },
    1840: {
      spaceBetween: 45,
    },
  }

});