const body = document.querySelector('body');
const iconMenuButton = document.querySelector('.js-icon-menu');
const overlay = document.querySelector('.js-header-overlay');
const mainHeader = document.querySelector('.js-main-header');
const mainNavItemLink = document.querySelectorAll('.js-main-nav-item-link');
const searchInput = document.querySelector('.js-search-input');
const catalogItem = document.querySelector('.js-catalog-item');

// Модуль работы с меню (бургер).
let bodyLockStatus = true;

let bodyLockToggle = () => {
  if (body.classList.contains("lock")) bodyUnlock();
  else bodyLock();
};

let bodyUnlock = () => {
  if (bodyLockStatus) {
    body.classList.remove("lock");
    bodyLockStatus = true;
  }
};

let bodyLock = () => {
  if (bodyLockStatus) {
    body.classList.add("lock");
    bodyLockStatus = true;
  }
};

function menuInit() {
  if (iconMenuButton)
    document.addEventListener("click", function (e) {
      if (bodyLockStatus && e.target.closest(".js-icon-menu")) {
        bodyLockToggle();
        body.classList.toggle("main-nav-open");
      }
    });
}

function spoilersHeader() {
  const spoilers = document.querySelectorAll("[data-spoiler]");

  if (spoilers.length > 0) {
    const breakpoint = 1279;
    const matchMedia = window.matchMedia(`(max-width: ${breakpoint}px)`);

    initSpoilers(spoilers, matchMedia);

    matchMedia.addEventListener('change', () => initSpoilers(spoilers, matchMedia));

    function initSpoilers(spoilersArray, matchMedia) {
      spoilersArray.forEach(spoiler => {
        spoiler.classList.add("--spoiler-init");

        if (matchMedia.matches || spoiler.dataset.spoiler === "click") {
          spoiler.removeEventListener("mouseover", setSpoilerAction);
          spoiler.addEventListener("click", toggleSpoiler);
        } else {
          spoiler.removeEventListener("click", toggleSpoiler);
          spoiler.addEventListener("mouseover", setSpoilerAction);
        }
      });
    }

    function setSpoilerAction(e) {
      const el = e.target.closest("[data-spoiler]");
      if (el) {
        const oneSpoiler = el.hasAttribute("data-one-spoiler");

        if (oneSpoiler && !el.classList.contains("--spoiler-active")) {
          hideSpoilersBody();
        }

        el.classList.add("--spoiler-active");
        if (window.innerWidth >= 1280) {
          overlay.classList.add("--active");
        }
        if (!body.classList.contains("main-nav-open")) {
          body.classList.add("lock");
        }

        e.preventDefault();
      }
    }

    function toggleSpoiler(e) {
      const el = e.target.closest("[data-spoiler]");
      if (el) {
        const oneSpoiler = el.hasAttribute("data-one-spoiler");

        if (oneSpoiler && !el.classList.contains("--spoiler-active")) {
          hideSpoilersBody();
        }

        el.classList.toggle("--spoiler-active");
        if (window.innerWidth >= 1280) {
          overlay.classList.toggle("--active", el.classList.contains("--spoiler-active"));
        }
        if (!body.classList.contains("main-nav-open")) {
          body.classList.toggle("lock", el.classList.contains("--spoiler-active"));
        }

        e.preventDefault();
      }
    }

    function hideSpoilersBody() {
      const activeSpoilers = document.querySelectorAll("[data-spoiler].--spoiler-active");
      if (activeSpoilers.length > 0 && window.innerWidth >= 1280) {
        activeSpoilers.forEach(activeSpoiler => {
          activeSpoiler.classList.remove("--spoiler-active");
          overlay.classList.remove("--active");
          body.classList.remove("lock");
        });
      }
    }

    document.addEventListener("mouseover", handleMouseLeft);
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);
  }

  function handleMouseLeft(e) {
    const allHovSpoilers = document.querySelectorAll(".js-main-nav-item-link-hover");
    allHovSpoilers.forEach((oneSpoiler) => {
      if (oneSpoiler.classList.contains('--spoiler-active') && window.innerWidth >= 1280) {
        if (!e.target.closest(".js-main-nav-item-link-hover") && !e.target.closest(".js-main-nav-item-content")) {
          oneSpoiler.classList.remove("--spoiler-active");
          overlay.classList.remove("--active");
          body.classList.remove("lock");
        }
      }
    })
  }

  function handleClickOutside(e) {
    if (!e.target.closest("[data-spoiler]") && !e.target.closest(".js-main-nav-item-content")) {
      hideSpoilersBody();
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      hideSpoilersBody();
    }
  }
}

// Модуль работы с табами.
function tabsHeader() {
  const tabsHeaderBlocks = document.querySelectorAll('[data-tabs-header]');

  tabsHeaderBlocks.forEach((tabsHeaderBlock) => {
    const tabsTitles = tabsHeaderBlock.querySelectorAll('[data-tabs-header-titles] > *');
    const tabsContents = tabsHeaderBlock.querySelectorAll('[data-tabs-header-body] > *');

    tabsTitles.forEach((tabTitle, index) => {
      tabTitle.setAttribute('data-tabs-header-title', index);
      tabsContents[index].setAttribute('data-tabs-header-item', index);

      tabsContents[index].hidden = !tabTitle.classList.contains('main-nav-tab-active');

      tabTitle.addEventListener('mouseover', () => {
        activateTab(tabsHeaderBlock, index);
      });
    });
  });

  function activateTab(tabsHeaderBlock, activeIndex) {
    const tabsTitles = tabsHeaderBlock.querySelectorAll('[data-tabs-header-title]');
    const tabsContents = tabsHeaderBlock.querySelectorAll('[data-tabs-header-item]');

    tabsTitles.forEach((tabTitle, index) => {
      if (index === activeIndex) {
        tabTitle.classList.add('main-nav-tab-active');
        tabsContents[index].hidden = false;
      } else {
        tabTitle.classList.remove('main-nav-tab-active');
        tabsContents[index].hidden = true;
      }
    });
  }
}

//  Модуль с Динамическим Адаптивом разметки
function dynamicAdapt() {
  class DynamicAdapt {
    constructor(type) {
      this.type = type;
      this.daClassname = "_dynamic_adapt_";
      this.nodes = document.querySelectorAll("[data-da]");
      this.arrOfObj = [];
      this.mediaQueries = [];
    }

    init() {
      this.arrOfObj = Array.from(this.nodes).map(node => {
        const [destinationSelector, breakpoint = "767", place = "last"] = node.dataset.da.trim().split(",");
        return {
          element: node,
          parent: node.parentNode,
          destination: document.querySelector(destinationSelector.trim()),
          breakpoint: breakpoint.trim(),
          place: place.trim(),
          index: this.indexInParent(node.parentNode, node)
        };
      });

      this.arraySort(this.arrOfObj);

      this.mediaQueries = [...new Set(this.arrOfObj.map(item => `(${this.type}-width: ${item.breakpoint}px),${item.breakpoint}`))];

      this.mediaQueries.forEach(media => {
        const [mediaQuery, mediaBreakpoint] = media.split(",");
        const matchMedia = window.matchMedia(mediaQuery);
        const arrOfObjFilter = this.arrOfObj.filter(item => item.breakpoint === mediaBreakpoint);

        matchMedia.addEventListener('change', () => this.mediaHandler(matchMedia, arrOfObjFilter));
        this.mediaHandler(matchMedia, arrOfObjFilter);
      });
      if (this.nodes.length > 0) {
        let windowScroll = new Event("windowScroll");
        window.addEventListener("scroll", () => document.dispatchEvent(windowScroll));
      }
    }

    mediaHandler(matchMedia, arrOfObj) {
      if (matchMedia.matches) {
        arrOfObj.forEach(oneObj => {
          oneObj.index = this.indexInParent(oneObj.parent, oneObj.element);
          this.moveTo(oneObj.place, oneObj.element, oneObj.destination);
        });
      } else {
        arrOfObj.reverse().forEach(oneObj => {
          if (oneObj.element.classList.contains(this.daClassname)) {
            this.moveBack(oneObj.parent, oneObj.element, oneObj.index);
          }
        });
      }
    }

    moveTo(place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === "last" || place >= destination.children.length) {
        destination.append(element);
      } else if (place === "first") {
        destination.prepend(element);
      } else {
        destination.children[place].before(element);
      }
    }

    moveBack(parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index]) {
        parent.children[index].before(element);
      } else {
        parent.append(element);
      }
    }

    indexInParent(parent, element) {
      return Array.from(parent.children).indexOf(element);
    }

    arraySort(arr) {
      const order = (a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) return 0;
          if (a.place === "first" || b.place === "last") return -1;
          if (a.place === "last" || b.place === "first") return 1;
          return a.place - b.place;
        }
        return this.type === "min" ? a.breakpoint - b.breakpoint : b.breakpoint - a.breakpoint;
      };
      arr.sort(order);
    }
  }

  const da = new DynamicAdapt("max");
  da.init();
}

// Модуль с моим кодом.

// При клике на поиск закрытие Меню-бургер + Сохранение класса lock.
const closeBurgerMenu = () => {
  if (body.classList.contains("main-nav-open"))
    body.classList.remove("main-nav-open", "lock");
};

// При клике на меню удаление класса --active оверлея.
const overlayClose = () => {
  overlay.classList.remove("--active");
};

// При клике на меню и поиск закрытие спойлеров мобильного меню.
const closeSpoilersContent = () => {
  if (body.classList.contains("main-nav-open")) {
    mainNavItemLink.forEach((oneButton) => {
      if (oneButton.classList.contains("--spoiler-active")) {
        oneButton.classList.remove("--spoiler-active");
      }
    });
  }
};

// При скролле страницы показ и скрытие шапки.
let prevScrollPos = window.scrollY;
const headerHeight = mainHeader.offsetHeight;
const scrollThreshold = 100;

const showAndHideHeader = () => {
  let currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) mainHeader.style.top = "0px";
  else if (currentScrollPos > scrollThreshold)
    mainHeader.style.top = `-${headerHeight}px`;
  prevScrollPos = currentScrollPos;
};

// Изменить атрибут у контейнера шапки для изменения логики работы Спойлеров.
const changeContainerAttribute = () => {
  const allSpoilers = document.querySelectorAll('[data-spoiler]')
  allSpoilers.forEach((oneSpoiler) => {
    if (window.innerWidth <= 1279) {
      oneSpoiler.removeAttribute('data-one-spoiler')
    } else if (window.innerWidth >= 1280) {
      oneSpoiler.setAttribute('data-one-spoiler', '')
    }
  })
};

// Закрыть спойлера, оверлея и lock body, при ресайзе страницы.
const closeSpoiler = () => {
  if (!body.classList.contains("main-nav-open") && window.innerWidth <= 1279) {
    mainNavItemLink.forEach((spoiler) => {
      if (spoiler.classList.contains("--spoiler-active")) {
        spoiler.classList.remove("--spoiler-active");
        overlay.classList.remove("--active");
        body.classList.remove("lock");
      }
    });
  }

  if (body.classList.contains("main-nav-open") && window.innerWidth >= 1280) {
    body.classList.remove("lock", "main-nav-open");
    mainNavItemLink.forEach((spoiler) => {
      spoiler.classList.remove("--spoiler-active");
    });
  }
};

// Менять класс у айтема Каталога
const prodClassChange = () => {
  if (window.innerWidth <= 1279)
    catalogItem.classList.remove('main-nav-item--catalog');
  else if (window.innerWidth >= 1280)
    catalogItem.classList.add('main-nav-item--catalog');
}

// Добавление / удаление классов у body и header в зависимости от скроллбара
const updatePadding = () => {
  if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
    body.classList.add('has-scrollbar');
    document.querySelector('.js-main-header-top').classList.add('has-scrollbar');
    document.querySelector('.js-main-header-bottom').classList.add('has-scrollbar')
  } else {
    body.classList.remove('has-scrollbar');
    document.querySelector('.js-main-header-top').classList.remove('has-scrollbar');
    document.querySelector('.js-main-header-bottom').classList.remove('has-scrollbar')
  }
}

// Функции-хендлеры.
const onIconMenuClick = (e) => {
  overlayClose(e);
  closeSpoilersContent();
};

const onDocumentScroll = () => {
  showAndHideHeader();
};

const onDocumentResize = () => {
  changeContainerAttribute();
  closeSpoiler();
  prodClassChange();
  updatePadding();
};

const onInputClick = (e) => {
  overlayClose(e);
  mainNavItemLink.forEach((spoiler) => {
    if (spoiler.classList.contains("--spoiler-active")) {
      spoiler.classList.remove("--spoiler-active");
      overlay.classList.remove("--active");
      body.classList.remove("lock");
    }
  })
  closeBurgerMenu();
};

// События на странице.
iconMenuButton.addEventListener("click", onIconMenuClick);
document.addEventListener("scroll", onDocumentScroll);
window.addEventListener("resize", onDocumentResize);
window.addEventListener("load", onDocumentResize);
searchInput.addEventListener('click', onInputClick);

menuInit();
spoilersHeader();
tabsHeader();
dynamicAdapt();
