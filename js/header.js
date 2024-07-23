const body = document.querySelector('body');
const iconMenuButton = document.querySelector('.js-icon-menu');
const overlay = document.querySelector('.js-header-overlay');
const mainHeader = document.querySelector('.js-main-header');
const headerWrapper = document.querySelector('.js-main-header-wrapper');
const mainNavItemButton = document.querySelectorAll('.js-main-nav-item-button');
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

// Модуль работы со спойлерами.
function spoilersHeader() {
  const spoilersArray = document.querySelectorAll("[data-spoilers]");

  if (spoilersArray.length > 0) {
    const spoilersRegular = Array.from(spoilersArray).filter(function (item) {
      return !item.dataset.spoilers.split(",")[0];
    });
    // Инициализация обычных слойлеров
    if (spoilersRegular.length) initSpoilers(spoilersRegular);

    // Инициализация
    function initSpoilers(spoilersArray, matchMedia = false) {
      spoilersArray.forEach((spoilersBlock) => {
        spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
        if (matchMedia.matches || !matchMedia) {
          spoilersBlock.classList.add("--spoiler-init");
          initSpoilerBody(spoilersBlock);
          spoilersBlock.addEventListener("click", setSpoilerAction);
        } else {
          spoilersBlock.classList.remove("--spoiler-init");
          initSpoilerBody(spoilersBlock, false);
          spoilersBlock.removeEventListener("click", setSpoilerAction);
        }
      });
    }

    // Работа с контентом
    function initSpoilerBody(spoilersBlock) {
      let spoilerTitles = spoilersBlock.querySelectorAll("[data-spoiler]");
      if (spoilerTitles.length)
        spoilerTitles = Array.from(spoilerTitles).filter(
          (item) => item.closest("[data-spoilers]") === spoilersBlock
        );
    }

    function setSpoilerAction(e) {
      const el = e.target;
      if (el.closest("[data-spoiler]")) {
        const spoilerTitle = el.closest("[data-spoiler]");
        const spoilersBlock = spoilerTitle.closest("[data-spoilers]");
        const oneSpoiler = spoilersBlock.hasAttribute("data-one-spoiler");

        if (
          oneSpoiler &&
          !spoilerTitle.classList.contains("--spoiler-active")
        ) {
          hideSpoilersBody(spoilersBlock);
        }

        if (window.innerWidth >= 1279) {
          overlay.classList.toggle("--active");
        }

        if (!body.classList.contains("main-nav-open")) {
          body.classList.toggle("lock");
        }

        spoilerTitle.classList.toggle("--spoiler-active");
        e.preventDefault();
      }
    }

    // Закрытие при клике вне спойлера
    function hideSpoilersBody(spoilersBlock) {
      const spoilerActiveTitle = spoilersBlock.querySelector(
        "[data-spoiler].--spoiler-active"
      );
      if (spoilerActiveTitle) {
        overlay.classList.remove("--active");

        body.classList.remove("lock");

        spoilerActiveTitle.classList.remove("--spoiler-active");
      }
    }

    const spoilersClose = document.querySelectorAll("[data-spoiler-close]");

    const isEscapeKey = (e) => "Escape" === e.key;

    if (spoilersClose.length) {
      document.addEventListener("click", function (e) {
        if (!e.target.closest("[data-spoilers]"))
          spoilersClose.forEach((spoilerClose) => {
            overlay.classList.remove("--active");
            if (!body.classList.contains("main-nav-open"))
              body.classList.remove("lock");
            spoilerClose.classList.remove("--spoiler-active");
          });
      });
      document.addEventListener("keydown", function (e) {
        if (isEscapeKey(e))
          spoilersClose.forEach((spoilerClose) => {
            overlay.classList.remove("--active");
            if (!body.classList.contains("main-nav-open"))
              body.classList.remove("lock");
            spoilerClose.classList.remove("--spoiler-active");
          });
      });
    }
  }
}

// Модуль работы с табами.
function tabsHeader() {
  const tabs = document.querySelectorAll('[data-tabs-header]');
  let tabsActiveHash = [];

  tabs.forEach((tabsBlock, index) => {
    tabsBlock.classList.add('--tab-init');
    tabsBlock.setAttribute('data-tabs-header-index', index);
    tabsBlock.addEventListener('mouseover', setTabsHeaderAction);
    initTabs(tabsBlock);
  });

  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-header-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-header-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] === tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector(
        '[data-tabs-header-titles]>.main-nav-tab-active'
      );
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-header-title', '');
        tabsContentItem.setAttribute('data-tabs-header-item', '');

        if (tabsActiveHashBlock && index === tabsActiveHash[1]) {
          tabsTitles[index].classList.add('main-nav-tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains(
          'main-nav-tab-active'
        );
      });
    }
  }

  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-header-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-header-item]');

    function isTabsAnimate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-header-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0
          ? Number(tabsBlock.dataset.tabsAnimate)
          : 500;
      }
    }

    const tabsBlockAnimate = isTabsAnimate(tabsBlock);
    if (tabsContent.length > 0) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('main-nav-tab-active')) {
          if (tabsBlockAnimate) {
          } else {
            tabsContentItem.hidden = false;
          }
        } else {
          if (tabsBlockAnimate) {
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }

  function setTabsHeaderAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-header-title]')) {
      const tabTitle = el.closest('[data-tabs-header-title]');
      const tabsBlock = tabTitle.closest('[data-tabs-header]');
      if (
        !tabTitle.classList.contains('main-nav-tab-active')
      ) {
        let tabActiveTitle = tabsBlock.querySelectorAll(
          '[data-tabs-header-title].main-nav-tab-active'
        );
        tabActiveTitle.length
          ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
            (item) => item.closest('[data-tabs-header]') === tabsBlock
          ))
          : null;
        tabActiveTitle.length
          ? tabActiveTitle[0].classList.remove('main-nav-tab-active')
          : null;
        tabTitle.classList.add('main-nav-tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}


//  Модуль с Динамическим Адаптивом разметки
function dynamicAdapt() {
  let addWindowScrollEvent = false;
  setTimeout(() => {
    if (addWindowScrollEvent) {
      let windowScroll = new Event("windowScroll");
      window.addEventListener("scroll", () => document.dispatchEvent(windowScroll));
    }
  }, 0);

  class DynamicAdapt {
    constructor(type) {
      this.type = type;
      this.daClassname = "_dynamic_adapt_";
    }

    init() {
      this.nodes = document.querySelectorAll("[data-da]");
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
    mainNavItemButton.forEach((oneButton) => {
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
  if (window.innerWidth <= 1279)
    headerWrapper.removeAttribute("data-one-spoiler");
  else if (window.innerWidth >= 1279)
    headerWrapper.setAttribute("data-one-spoiler", "");
};

// Закрыть спойлера, оверлея и lock body, при ресайзе страницы.
const closeSpoiler = () => {
  if (!body.classList.contains("main-nav-open") && window.innerWidth <= 1279) {
    mainNavItemButton.forEach((spoiler) => {
      if (spoiler.classList.contains("--spoiler-active")) {
        spoiler.classList.remove("--spoiler-active");
        overlay.classList.remove("--active");
        body.classList.remove("lock");
      }
    });
  }

  if (body.classList.contains("main-nav-open") && window.innerWidth >= 1279) {
    body.classList.remove("lock", "main-nav-open");
    mainNavItemButton.forEach((spoiler) => {
      spoiler.classList.remove("--spoiler-active");
    });
  }
};

// Менять класс у айтема Каталога
const prodClassChange = () => {
  if (window.innerWidth <= 1279) {
    catalogItem.classList.remove('main-nav-item--catalog');
  } else {
    catalogItem.classList.add('main-nav-item--catalog');
  }
}

// Функции-хендлеры.
const onIconMenuClick = (e) => {
  // closeSearchWrapper();
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
};

const onInputClick = (e) => {
  overlayClose(e);
  mainNavItemButton.forEach((spoiler) => {
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
